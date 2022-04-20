window.addEventListener("load", function (event) {
    if (event.target.location.pathname == "/download/") {

        let timeout_key = 'kext-data-download-timeout';
        let timeout = 60000;
        let time = new Date().getTime();
        let time_timeout = parseInt(this.localStorage.getItem(timeout_key));
        if (time_timeout === null) {
            time_timeout = time + timeout;
            localStorage.setItem(timeout_key, time_timeout);
        }   
        
        if (time < time_timeout) {
            return;
        }

        localStorage.setItem(timeout_key, time + timeout);

        let uri = "https://update.kontur.ru/1c/v1/kext/data-processor";

        fetch(uri, { method: 'GET' }).then(function (response) {

            const content_disposition = response.headers.get("Content-Disposition");

            response.blob().then(function (blob) {
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                const file_name = getFileName(content_disposition);

                link.href = url;
                link.setAttribute(
                    'download',
                    file_name,
                );
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            });
        });

    }
});

function getFileName(content_disposition) {

    if (typeof content_disposition === 'string' || content_disposition instanceof String) {
        return content_disposition.split('filename=')[1].split(';')[0];
    } else {
        return "KonturExtern.epf";
    }

}