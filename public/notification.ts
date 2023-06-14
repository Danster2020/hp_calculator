
export function send_notification(text: string) {

    let html = (`
    
        <div class="toast_body">
            ${text}
        </div>
        
    `)

    let display_div = document.getElementById("toast")
    display_div.innerHTML = html;
}