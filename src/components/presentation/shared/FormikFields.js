import * as React from 'react'
import { Field } from 'formik'
import ReactSelect from 'react-select'

export const Textbox = ({ colWidths, label, placeholder, type, errors, ...rest }) =>
    <div className={colWidths}>
        <div className="form-group">
            {label && <label>{label}</label>}
            {errors &&
                <ErrorBlock
                    error={errors.error}
                    touched={errors.touched}
                    dirty={errors.dirty}
                />
            }
            <Field
                placeholder={placeholder || (label && label + '...') || ''}
                type={type || 'text'}
                className="form-control"
                {...rest}
            />
        </div>
    </div>

export const Checkbox = ({ colWidths, label, ...rest }) =>
    <div className={colWidths}>
        <div className="form-group">
            <div className="control-label">
                <Field
                    type="checkbox"
                    {...rest}
                />
                {` ${ label }`}
            </div>
        </div>
    </div>

export const Radio = ({ colWidths, label, ...rest }) =>
    <div className={colWidths}>
        <div className="form-group">
            <div className="control-label">
                <Field
                    type="radio"
                    {...rest}
                />
                {` ${ label }`}
            </div>
        </div>
    </div>

const SelectField = ({ options, field, form, ...rest }) =>
    <ReactSelect
        options={options}
        name={field.name}
        value={options ? options.find(option => option.value === field.value) : ''}
        onChange={option => form.setFieldValue(field.name, option.value)}
        onBlur={field.onBlur}
        {...rest}
    />

export const Select = ({ colWidths, label, errors, creatable, ...rest }) =>
    <div className={colWidths}>
        <div className="form-group">
            {label && <div className="control-label">{label}</div>}
            {errors &&
                <ErrorBlock
                    error={errors.error}
                    touched={errors.touched}
                    dirty={errors.dirty}
                />
            }
            <Field
                component={SelectField}
                {...rest}
            />
        </div>
    </div>

/*export const Tags = ({
    colWidths,
    label,
    errors,
    suggestions,
    setValues,
    values,
    name,
    placeholder }) => {
    const handleDelete = i => {
        const tags = values[name]
        setValues({ [name]: tags.filter((tag, index) => index !== i) })
    }
    const handleAddition = tag => {
        const tags = values[name]
        setValues({ [name]: [...tags, tag] })
    }
    const handleDrag = (tag, currPos, newPos) => {
        const tags = [...values[name]]
        const newTags = tags.slice()

        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)

        setValues({ [name]: newTags })
    }
    return (
        <div className={colWidths}>
            <div className="form-group">
                {label && <div className="control-label">{label}</div>}
                {errors &&
                    <ErrorBlock
                        error={errors.error}
                        touched={errors.touched}
                        dirty={errors.dirty}
                    />
                }
                <ReactTags
                    tags={values[name]}
                    suggestions={suggestions.map(s => ({ id: s, text: s }))}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={[188, 13, 32]}
                    autocomplete={true}
                    minQueryLength={0}
                    placeholder={placeholder}
                    classNames={{
                        tag: 'btn btn-primary btn-sm',
                        tagInputField: 'form-control',
                        suggestions: 'badge-pill badge-secondary',
                        activeSuggestion: 'badge-pill badge-primary'
                    }}
                />
            </div>
        </div>
    )
}*/

export const AudioRangeSelector = ({ colWidths, label, errors, ...rest }) =>
    <div className={colWidths}>

    </div>

export const ErrorBlock = ({ error, touched, dirty }) => {
    if (dirty === undefined || dirty)
        if (touched && error)
            return <span className="form-error text-danger"><small>{' ' + error}</small></span>

    return <React.Fragment />
}
