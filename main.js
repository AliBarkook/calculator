function getExpression() {
    const exp = document.getElementById('input').value;

    if (exp == "")
      alert('pls enter expression')

    token_list = tokenize(exp)

    alert(`token list:\n${token_list}`);
}


function tokenize(exp) {
    const tokens = []
    let cur_token = "" // ? current processing token

    // ? iterate over exp
    for (i in exp) {
        const char = exp[i];
        
        // ? if it's a digit or a decimal point
        if ("0123456789.".includes(char))
            cur_token = '' + cur_token + char;

        // ? if we have a token already
        else if (cur_token) {
            tokens.push(cur_token)
            cur_token = ""
        } 

        // ? if it's an operator or parenthesis
        if ("+-*/()".includes(char))
            tokens.push(char)
    }

    if (cur_token)
        tokens.append(cur_token)


    return tokens 
}