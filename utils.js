export const waitFor = (timeout = 0) =>
    new Promise((res) => {
        setTimeout(() => res(), timeout);
    });

export const generateProcess = (group) => {
    let resolve;
    const promise = new Promise((res) => {
        resolve = res;
    });
    return {
        id: Math.random(),
        group,
        promise,
        resolve,
    };
};
