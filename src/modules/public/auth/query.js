const VALIDATE = `
	SELECT 
		u.user_id
	FROM users u
	WHERE u.user_username = $1 AND 
	u.user_password = crypt($2, u.user_password) AND 
	u.user_role = ANY($3::int[])
`;

module.exports = {
	VALIDATE
};