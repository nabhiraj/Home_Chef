export default function generateMappingPage(ip,port){
    let res = `<html>
    <head>
        <title> the dummy title</title>
    </head>
    <body>
        power
        <div id="id=”f-f-c-o-c-452">
            [${ip}]:${port}
        </div>
        <script>
            window.location.href = 'http://[${ip}]:${port}';
        </script>
    </body>
</html>`;
        return res;
}