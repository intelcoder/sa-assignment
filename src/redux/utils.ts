

export const actionCreator = (type: string, payload = {}) =>
({ type, ...payload })
