const url = '/api/userfeedback/'

class UserFeedbackService {
    static async getUserFeedbackData(id, accessToken) {
        try {
            const res = await fetch(`${url}${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            const data = await res.json();
            
            return data
            
        } catch (err) {
            throw err;
        }
    }
    static postUserFeedbackData(data, id, accessToken) {
        try {
            const comment = {
                title: data.title,
                comment: data.comment
            }
            return fetch(`${url}${id}`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(comment)
            });
        } catch (err) {
            throw err;
        }
    }

    static deleteUserFeedbackData(id, feedbackId, accessToken) {
        try {
            return fetch(`${url}${id}?feedback=${feedbackId}`, {
                method: 'delete',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        } catch (err) {
            throw err;
        }
    }
}

export default UserFeedbackService