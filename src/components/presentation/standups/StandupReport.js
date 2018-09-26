import React from 'react'
import { arrayOf, object, func } from 'prop-types'
import { withFormik, Form } from 'formik'
import * as Yup from 'yup'

import StandupRow from './StandupRow'
import CreateSelect from '../shared/CreateSelect'
import { Select } from '../shared/FormikFields';

StandupReport.displayName = 'Standup Report'

StandupReport.propTypes = {
    group: object,
    report: object,
    reports: arrayOf(object).isRequired,
    rows: arrayOf(object).isRequired,
    metrics: arrayOf(object).isRequired,
    ranges: arrayOf(object).isRequired,
    periods: arrayOf(object).isRequired,
    selectReport: func.isRequired,
    createReport: func.isRequired,
    createRow: func.isRequired
}

function StandupReport ({
    group,
    report,
    rows,
    reports,
    metrics,
    ranges,
    periods,
    selectReport,
    createReport,
    createRow
}) {
    if (!group)
        return <h1>Select a Group...</h1>
    return (
        <div className="row">
            <div className="col-12 col-sm-5">
                <CreateSelect
                    name="reportId"
                    placeholder="Select or Create a Report..."
                    onCreate={createReport}
                    onSelect={selectReport}
                    selectedValue={report && report.id.toString()}
                    options={reports.map(report => ({ label: report.name, value: report.id.toString() }))}
                    autoFocus
                />
            </div>

            {report &&
                <div className="col-12 col-sm-7">
                    <Form>
                        <div className="row">
                            <div className="col-12 col-sm-5">
                                <Select
                                    name="runPeriod"
                                    placeholder="Report Frequency..."
                                    options={periods.map(period => ({ label: period.label, value: period.key }))}
                                    autoFocus
                                />
                            </div>
                            {['daily', 'quarterly'].includes(report.runPeriod) &&
                                <div className="col-12 col-sm-7">
                                    <Select
                                        name="runOn"
                                        placeholder="Run on Days..."
                                        options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => ({ label: day, value: day.toLowerCase() }))}
                                        isMulti={true}
                                    />
                                </div>
                            }
                        </div>
                    </Form>
                </div>
            }
            {report && report.runPeriod &&
                <div className="row">
                    {rows.map(row =>
                        <div className="col-12">
                            <StandupRow
                                metrics={metrics}
                                ranges={ranges}
                                row={row}
                                createRow={createRow}
                            />
                        </div>
                    )}
                    <div className="col-12">
                        <StandupRow
                            metrics={metrics}
                            ranges={ranges}
                            createRow={createRow}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default withFormik({
    mapPropsToValues: ({ report }) => ({
        reportId: (report && report.id) || '',
        runPeriod: '',
        runOn: ''
    }),
    enableReinitialize: true,
    isInitialValid: true,
    validationSchema: Yup.object().shape({
        reportId: Yup
            .number()
            .integer()
            .positive()
            .required(),
        runPeriod: Yup.string().required(),
        runOn: Yup.string().required()
    }),
    handleSubmit: (values, bag) => {

    }
})(StandupReport)
