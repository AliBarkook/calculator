function getExpression() {
    const exp = document.getElementById('input').value;

    if (exp == "")
      alert('pls enter expression')

    token_list = tokenizer(exp)

    alert(`token list:\n${token_list}`);

    if (validator(exp)) {
    }
}


function tokenizer(exp) {
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
        tokens.push(cur_token)

    return tokens 
}


function validator(exp) {

    const parts = tokenizer(exp)
    let error = "" // ? error message
    let errorPos
    let pLevel = 0 // ? parenthesis level
    let previous = "$" // ? previous token

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        errorPos = i

        // ? update parenthesis level
        pLevel += (part=="(") - (part==")") 

        // ? if we have too many closing parentheses
        if (pLevel<0) { 
            error="too many closing parentheses"
            break 
        }
        
        // ? if we have two operators in a row
        if ("*+/)".includes(part) && "$*+-/(".includes(previous)) { 
            error = "missing operand"
            break 
        }
        
        // ? if we have two operands in a row
        if (!"*+-/)".includes(part) && !"$*+-/(".includes(previous)) { 
            error = "missing operator"
            break
        }
        
        previous = part

        // ? if it's an operator
        if (["*","+","-","/","(",")"].includes(part)) 
            continue
        
        // ? if it's a number
        if (!part.split(".",1).some(isNaN))
            continue
        
        error = "invalid operand: " + part
        break
        
    }
    
    // ? if we have too many opening parentheses
    if (!error && pLevel != 0) {
        errorPos = parts.length
        error = "unbalanced parentheses"
    }
        
    // ? if the expression ends with an operator
    if (!error && "*+-/".includes(previous)) {
        errorPos = parts.length
        error = "missing operand"
    }

    // ? show error
    if (error){
        alert(`${error}\n at position ${errorPos}`)
        return false
    }

    return true
}

    