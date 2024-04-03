

export default (controller: string, action: string): void => {
    window.location.href = `${document.baseURI}${controller}/${action}/`;
}