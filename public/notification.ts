
export function send_notification(text: string, type: string) {

    let color = "";

    if (type == "r") {
        color = "toast_red";
    }
    else if (type == "g") {
        color = "toast_green";
    }

    let html = (`
    
        <div id="toast_child" class="toast_body ${color}">
            ${text}
        </div>
        
    `)

    let toast_div = document.getElementById("toast")
    toast_div.innerHTML = html;
    let toast_child_div = document.getElementById("toast_child")

    console.log("Notification sent.")

    setTimeout(function () {
        toast_child_div.classList.add('slide_out');
    }, 2000);

    setTimeout(function () {
        toast_child_div.classList.remove('slide_out');
        toast_div.innerHTML = "";
    }, 3000);
}