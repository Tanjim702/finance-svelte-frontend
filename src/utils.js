import jwtDecode from "jwt-decode";
import request from './request'
export const decodeToken = token => {
    if (token) {
        const decode = jwtDecode(token)
        return decode
    } else {
        return
    }
}
export const toggleAuthHeader = (type, token) => {
    switch (type) {
        case 'login':
            localStorage.setItem('token', JSON.stringify(token))
            const retrivedToken = localStorage.getItem('token')
            request.defaults.headers.common['authorization'] = retrivedToken
            break;
        case 'logout':
            localStorage.removeItem('token')
            request.defaults.headers.common['authorization'] = ''
            break
        case 'set':
            if (token) {
                request.defaults.headers.common['authorization'] = token
            }
            break

        default:
            return
    }

}
// export const classify = transactions => {
//     const types = ['income', 'expense', 'asset', 'liability']
//     const myTransactions
//     for (type of types) {
//         for (incomeType in transactions) {
            
//         }
//     }
// }
export const classifyIntoMonths = transactions => {
    const months = {}
    const initmonths = {
        0: { name: 'January', trans: [] }, 1: { name: 'February', trans: [] }, 2: { name: 'March', trans: [] }, 3: { name: 'April', trans: [] }, 4: { name: 'May', trans: [] }, 5: { name: 'June', trans: [] }, 6: { name: 'July', trans: [] }, 7: {
            name: 'August',
            trans: []
        }, 8: { name: 'September', trans: [] }, 9: { name: 'October', trans: [] }, 10: { name: 'November', trans: [] }, 11: { name: 'December', trans: [] },
    }

    transactions.forEach(transaction => {
        initmonths[`${transaction.month}`].trans.push(transaction)
    })
    for (const index in initmonths) {
        if (initmonths[`${index}`].trans.length > 0) {
            months[`${index}`] = initmonths[`${index}`]
        }
    }
    return months
}