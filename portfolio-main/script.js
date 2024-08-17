let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let btnText = e.target.innerHTML;

        if (btnText == '=') {
            try {
                string = eval(string);
            } catch (e) {
                string = "Error";
            }
            input.value = string;
        } else if (btnText == 'AC') {
            string = "";
            input.value = string;
        } else if (btnText == 'DEL') {
            string = string.slice(0, -1);
            input.value = string;
        } else if (btnText == '%') {
            string = (parseFloat(string) / 100).toString();
            input.value = string;
        } else {
            if (string === "Error") {
                string = "";
            }
            string += btnText;
            input.value = string;
        }
    });
});
