import React from 'react'
import { arrayOf, object, func, string } from 'prop-types'
import { withFormik, Form } from 'formik'
import Creatable from 'react-select/lib/Creatable'

CreateSelect.displayName = 'Create Select'

CreateSelect.propTypes = {
    name: string.isRequired,
    onCreate: func.isRequired,
    onSelect: func.isRequired,
    options: arrayOf(object).isRequired,
    selectedValue: string,
    placeholder: string,
    label: string
}

function CreateSelect ({
    name,
    label,
    options,
    onCreate,
    placeholder,
    status,
    setStatus,
    values,
    setValues,
    submitForm,
    autoFocus
}) {
    const handleCreateOption = value => onCreate(value, { setStatus })
    const handleChange = option => {
        setValues({ [name]: option.value })
        submitForm()
    }
    return (
        <Form>
            <div className="form-group">
                {label && <div className="control-label">{label}</div>}
                <Creatable
                    name={name}
                    placeholder={placeholder}
                    onCreateOption={handleCreateOption}
                    isDisabled={status && status.loading}
                    isLoading={status && status.loading}
                    options={options}
                    value={options ? options.find(option => option.value === values[name]) : ''}
                    onChange={handleChange}
                    autoFocus={autoFocus}
                />
            </div>
        </Form >
    )
}

export default withFormik({
    mapPropsToValues: ({ selectedValue = '', name }) => ({
        [name]: selectedValue.toString()
    }),
    enableReinitialize: true,
    isInitialValid: true,
    handleSubmit: (values, bag) => {
        const { onSelect, name } = bag.props
        onSelect(+values[name])
    }
})(CreateSelect)
