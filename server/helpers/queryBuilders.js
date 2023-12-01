exports.buildUserPatchQuery = function (user) {
    
    // User still retains all attributes, however, only patch non-null ones provided. Also, userId is what we search for, not update, which is why it's ignored
    const updateFields = Object.keys(user).filter(key => user[key] !== undefined && key != 'userId');

    if (updateFields.length === 0) {
        // If there are no valid fields to update, return an empty string
        return '';
    }

    // 1) Converts {col1: val1, col2: val2} into 'col1 = val1, col2 = val2'
    // 2) Null related code takes care of an SQL edge case and converts 'NULL' TO NULL
    const setClause = updateFields.map(field => 
        user[field] !== null ? `${field} = '${user[field]}'` : `${field} = NULL`)
        .join(', ');

    const query = `UPDATE users SET ${setClause} WHERE userId = '${user.userId}'`;

    return query;
}