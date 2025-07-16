export const R = {
    s: (res, message, data = {}) =>
        res.status(200).json({ status: 200, message, ...(data && { data }) }),

    e: (res, message = "Internal Server Error", code = 500) =>
        res.status(code).json({ status: code, message }),

    c: (res, code, message, data = {}) =>
        res.status(code).json({ status: code, message, ...(data && { data }) })
};  