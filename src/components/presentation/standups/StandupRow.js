import React from 'react'
import { arrayOf, object, func, number } from 'prop-types'
import { Form, withFormik } from 'formik'
import * as Yup from 'yup'
import { Select, ErrorBlock, Textbox } from '../shared/FormikFields'

StandupRow.displayName = 'Standup Group Row'

StandupRow.propTypes = {
    id: number,
    row: arrayOf(object),
    metrics: arrayOf(object).isRequired,
    ranges: arrayOf(object).isRequired,
    createRow: func.isRequired
}

function StandupRow ({
    metrics,
    ranges,

    errors,
    touched,
    dirty
}) {
    return (
        <Form>
            <ErrorBlock
                error={[errors.metric, errors.range, errors.goal].filter(error => error).join(', ')}
                touched={[touched.metric, touched.range, touched.goal].filter(touched => touched).join(', ')}
                dirty={dirty}
            />
            <div className="row">
                <Select
                    name="metric"
                    placeholder="Select a Metric..."
                    options={metrics.map(metric => ({ label: metric.name, value: metric.name }))}
                    colWidths="col-12 col-sm-5"
                />
                <Select
                    name="range"
                    placeholder="Report Range..."
                    options={ranges.map(range => ({ label: range.label, value: range.key }))}
                    colWidths="col-12 col-sm-3"
                />
                <Textbox
                    name="goal"
                    placeholder="Enter a Goal..."
                    colWidths="col-10 col-sm-3"
                />
                <div className="col-2 col-sm-1">
                    <button
                        type="submit"
                        className="btn btn-sm btn-link"
                    >
                        <i className="fas fa-plus-circle"></i>
                    </button>
                </div>
            </div>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: ({ row = {} }) => ({
        metric: row.metric || '',
        range: row.range || '',
        goal: row.goal || ''
    }),
    validationSchema: Yup.object().shape({
        metric: Yup.string().required('Metric Required'),
        range: Yup.string().required('Range Required'),
        goal: Yup.string().required('Goal Required')
    }),
    handleSubmit: (values, bag) =>
        bag.props.createRow({
            id: bag.props.id,
            metric: values.metric,
            range: values.range,
            goal: values.goal,
            group: bag.props.group
        }, bag)
})(StandupRow)
