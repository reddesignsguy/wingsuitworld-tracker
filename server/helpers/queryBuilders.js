exports.buildUserPatchQuery = function (user) {
    // User still retains all attributes, however, only patch non-null ones provided. Also, userId is what we search for, not update, which is why it's ignored
    const updateFields = Object.keys(user).filter(key => user[key] != null && key != 'userId');

    if (updateFields.length === 0) {
        // If there are no valid fields to update, return an empty string
        return '';
    }
    const setClause = updateFields.map(field => `${field} = '${user[field]}'`).join(', ');

    const query = `UPDATE users SET ${setClause} WHERE userId = '${user.userId}'`;
    return query;
}