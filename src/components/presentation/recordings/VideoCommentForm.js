import React from 'react'
import { func, bool, string, object, number } from 'prop-types'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'

const SecurityLevels = { ONLY_YOU: 0, TEAMMATES: 1, ANYONE: 2 }

class VideoCommentForm extends React.Component {

    static displayName = 'Video Comment Form'

    static propTypes = {
        createComment: func.isRequired,
        recording: object.isRequired,
        cancelClick: func.isRequired,
        focusTextbox: func,
        setTimestamp: func,
        decTimestamp: func,
        incTimestamp: func,
        paused: bool,
        timestamp: string,
        replyToId: number
    }

    setSecurityLevel = e => this.props.setValues({ ...this.props.values, security: +e.target.dataset.value })

    handleCancelClick = () => {
        this.props.resetForm()
        this.props.cancelClick()
    }

    securityString (level) {
        switch (level) {
            case SecurityLevels.ONLY_YOU:
                return "Only You"
            case SecurityLevels.TEAMMATES:
                return "Teammates"
            case SecurityLevels.ANYONE:
                return "Anyone"
            default:
                return ""
        }
    }

    render () {
        const {
            replyToId,
            inputRef,

            focusTextbox,
            setTimestamp,
            decTimestamp,
            incTimestamp,
            paused,
            timestamp,

            values,
            errors,
            touched,
            isSubmitting,
            isValid
        } = this.props
        return (
            <div className="video-comments-form__container" >
                <Form>
                    {!replyToId &&
                        <div className="dropdown dropleft float-right">
                            <button type="button" className="btn btn-outline-secondary btn-sm border" data-toggle="dropdown">
                                <i className="fas fa-lock"></i><small> {this.securityString(values.security)}</small>
                            </button>
                            <div className="dropdown-menu">
                                <button
                                    type="button"
                                    className="dropdown-item"
                                    data-value={SecurityLevels.TEAMMATES}
                                    onClick={this.setSecurityLevel}
                                >
                                    {values.security === SecurityLevels.TEAMMATES &&
                                        <i className="fas fa-check"></i>
                                    }
                                    {' Teammates'}
                                </button>
                                <button
                                    type="button"
                                    className="dropdown-item"
                                    data-value={SecurityLevels.ONLY_YOU}
                                    onClick={this.setSecurityLevel}
                                >
                                    {values.security === SecurityLevels.ONLY_YOU &&
                                        <i className="fas fa-check"></i>
                                    }
                                    {' Only You'}
                                </button>
                            </div>
                        </div>
                    }
                    {timestamp &&
                        <div className="input-group">
                            <Field
                                name="timestamp"
                                placeholder={timestamp}
                                type="text"
                                className={(errors.timestamp && touched.timestamp ? 'is-invalid ' : '') + 'form-control form-control-sm d-inline-block text-right'}
                                value={paused ? timestamp : ''}
                                onFocus={focusTextbox}
                                onChange={setTimestamp}
                            />
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm border"
                                    onClick={decTimestamp}
                                >
                                    <i className="fas fa-caret-down"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm border"
                                    onClick={incTimestamp}
                                >
                                    <i className="fas fa-caret-up"></i>
                                </button>
                            </div>
                        </div>
                    }
                    <Field
                        name="comment"
                        placeholder="Enter a comment..."
                        type="text"
                        component="textarea"
                        className={(errors.comment && touched.comment ? 'is-invalid ' : '') + 'form-control'}
                        onFocus={focusTextbox}
                        innerRef={inputRef}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                        disabled={isSubmitting || !isValid}
                    >
                        {'Post'}
                    </button>
                    {paused !== false &&
                        <button
                            type="reset"
                            className="btn btn-link text-danger btn-sm"
                            onClick={this.handleCancelClick}
                        >
                            {'Cancel'}
                        </button>
                    }
                </Form>
            </div>
        )
    }
}

const timestampRegex = /^(([0-9]{1,2}):{1})?([0-5]{1}[0-9]{1}):([0-5]{1}[0-9]{1})$/

export default withFormik({
    mapPropsToValues: ({ currentTime, timestamp }) => ({
        comment: '',
        currentTime: currentTime || 0,
        timestamp: timestamp || '',
        security: 1,
        reply_to: null
    }),
    isInitialValid: true,
    validationSchema: Yup.object().shape({
        comment: Yup.string().required('Required'),
        timestamp: Yup.string().matches(timestampRegex, 'Invalid Time Format')
    }),
    handleSubmit: (values, bag) => {
        const commentModel = {
            recording_id: bag.props.recording.id,
            comment: values.comment,
            timestamp: bag.props.currentTime,
            security: values.security,
            reply_to: bag.props.replyToId
        }
        bag.props.createComment(commentModel, bag)
    }
})(VideoCommentForm)
