import React from 'react'
import { arrayOf, object, func } from 'prop-types'

import CreateSelect from '../shared/CreateSelect'

StandupGroup.displayName = 'Standup Group'

StandupGroup.propTypes = {
    groups: arrayOf(object).isRequired,
    createGroup: func.isRequired,
    selectGroup: func.isRequired,
    selectedGroup: object
}

function StandupGroup ({
    groups,
    createGroup,
    selectGroup,
    selectedGroup
}) {
    return (
        <CreateSelect
            name="groupId"
            placeholder="Select or Create a Group..."
            onCreate={createGroup}
            onSelect={selectGroup}
            selectedValue={selectedGroup && selectedGroup.id.toString()}
            options={groups.map(group => ({ label: group.name, value: group.id.toString() }))}
        />
    )
}

export default StandupGroup
