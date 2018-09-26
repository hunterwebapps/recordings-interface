import axios from 'axios'

const csrfTag = document.querySelector('meta[name="csrf-token"]')
if (csrfTag)
    axios.defaults.headers.common['X-CSRF-Token'] = csrfTag.getAttribute('content')

export const Recordings = {
    Get: async (recordingId = '') =>
        await axios.get(`/recordings/all/${ recordingId }`)
            .catch(err => err),
    GetPublic: async (recordingId, authToken) =>
        await axios.get(`/shared_recordings/${ recordingId }?auth_token=${ authToken }`)
            .catch(err => err),
    GetLimit: async (offset = 0, limit = 20) =>
        await axios.get(`/recordings/all?offset=${ offset }&limit=${ limit }`)
            .catch(err => err),
    GetLink: async shareModel =>
        await axios.post(`/recordings/shareRecording`, shareModel)
            .catch(err => err),
    Update: async postModel =>
        await axios.put('/api/Posts', postModel)
            .catch(err => err),
    Delete: async recordingId =>
        await axios.delete(`/recordings/${ recordingId }`)
            .catch(err => err),
    Comments: {
        Create: async commentModel =>
            await axios.post(`/recordings/createComment`, commentModel)
                .catch(err => err)
    }
}

export const Standups = {
    Groups: {
        Get: async (groupId = '') =>
            await axios.get(`/standups/groups/${ groupId }`)
                .catch(err => err),
        Create: async groupModel =>
            await axios.post('/standups/groups', groupModel)
                .catch(err => err)
    },
    Reports: {
        Get: async (reportId = '') =>
            await axios.get(`/standups/reports/${ reportId }`)
                .catch(err => err),
        Create: async reportModel =>
            await axios.post('/standups/reports', reportModel)
                .catch(err => err)
    },
    Rows: {
        Get: async (rowId = '') =>
            await axios.get(`/standups/rows/${ rowId }`)
                .catch(err => err),
        Create: async rowModel =>
            await axios.post('/standups/rows', rowModel)
                .catch(err => err)
    },
    Metrics: {
        Get: async () =>
            await axios.get('/standups/metrics')
                .catch(err => err)
    }
}
