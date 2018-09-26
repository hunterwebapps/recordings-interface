import React from 'react'
import { arrayOf, object, bool, func } from 'prop-types'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Textbox, ErrorBlock, Select } from '../shared/FormikFields'

import Card from '../shared/Card'
import CopyInput from '../shared/CopyInput';

VideoShare.displayName = 'Video Share'

VideoShare.propTypes = {
    teamMembers: arrayOf(object).isRequired,
    show: bool.isRequired,
    hide: func.isRequired,
    recording: object,
    getLink: func.isRequired
}

function VideoShare ({
    teamMembers,
    show,
    hide,
    recording,

    errors,
    touched,
    dirty,
    isValid,
    isSubmitting
}) {
    return (
        <div className={(show ? 'show ' : '') + 'video-share__container'}>
            <Card title={
                <React.Fragment>
                    <div className="btn btn-sm" onClick={hide}>
                        <i className="fas fa-times"></i>
                    </div>
                    {'Share this Recording'}
                </React.Fragment>
            }>
                <small className="text-muted">Users see a simplified version of this call.</small>
                {/*<button type="button" className="btn btn-link btn-sm d-block mx-auto">
                    <i className="far fa-eye"></i>{' Preview Recipient Page'}
                </button>*/}
                <Form>
                    <small className="text-muted">Team members will receive a Slack DM.</small>
                    <Select
                        name="team_recipients"
                        placeholder="Select Team Members..."
                        isMulti={true}
                        options={teamMembers.map(member => ({ value: member.id, label: member.name || member.email }))}
                        errors={{
                            error: errors.team_recipients,
                            touched: touched.team_recipients,
                            dirty
                        }}
                    />

                    <Textbox
                        name="message"
                        label="Add a Message"
                        placeholder="Example: The important part starts at 3:45..."
                        rows={3}
                        component="textarea"
                        errors={{
                            error: errors.message,
                            touched: touched.message,
                            dirty
                        }}
                    />

                    <ErrorBlock
                        error={errors.expiration_days}
                        touched={touched.expiration_days}
                        dirty={dirty}
                    />
                    <small>{'Expires In: '}</small><Field
                        name="expiration_days"
                        className="form-control form-control-sm d-inline text-right"
                        style={{ width: '35px' }}
                    /><small>{' days'}</small>

                    <div>
                        <button
                            type="button"
                            className="btn btn-sm float-right cancel"
                            onClick={hide}
                        >
                            {'Close'}
                        </button>
                        <button
                            type="submit"
                            className="btn btn-link btn-sm"
                            disabled={isSubmitting || !isValid}
                        >
                            <i className="fas fa-link"></i>{' Generate Shareable Link'}
                        </button>
                    </div>

                    <div className={(recording.shareable_url ? 'show ' : '') + 'shareable-link'}>
                        <CopyInput text={recording.shareable_url} />
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        team_recipients: [],
        message: '',
        expiration_days: 5
    }),
    validationSchema: Yup.object().shape({
        message: Yup.string().max(1000, 'Max 100 Characters'),
        expiration_days: Yup.number().positive('Can\'t be in the Past').required('Required')
    }),
    isInitialValid: true,
    handleSubmit: (values, bag) =>
        bag.props.getLink({
            recording_id: bag.props.recording.id,
            user_id_list: values.team_recipients,
            message: values.message,
            expiration_days: values.expiration_days
        }, bag)
})(VideoShare)
