const addButton = document.querySelector('#btn')
const input = document.querySelector('#input')
const list = document.querySelector('#list')

function createElements(...array) {
    return array.map(el => {
        return document.createElement(el)
    })
}
if(!JSON.parse(localStorage.getItem("todos"))){
    let obyekt = {}
    localStorage.setItem("todos",JSON.stringify(obyekt))
}

let data = new Date
let hour = document.getElementById("time")


let obj = JSON.parse(localStorage.getItem("todos"))

checkObject(obj)
function show(object){
    let hour_minut = data.getHours().toString().padStart(2,"0")+data.getMinutes().toString().padStart(2,"0")

    document.getElementById("list").innerHTML = null
    if(Object.keys(object).length>0){
        for(let c in object){
            const [
                li,
                textElement,
                div,
                span,
                button
            ] = createElements('li', 'span', 'div','span', 'button')
            textElement.textContent = object[c]
            span.textContent = c
            localStorage.setItem("todos", JSON.stringify(object))

            button.textContent = 'X'

            div.className = 'colors'

            li.append(textElement, div,span,button)
            if(hour_minut>=parseInt(c.split(":").join(""))){
                li.classList.add("liRed")
            }
            list.append(li)
            


            button.addEventListener('click', () => {
                delete object[c]
                localStorage.setItem("todos", JSON.stringify(object))
                li.remove()
            })
            //  console.log(JSON.parse(localStorage.getItem("todos")))
        }
    }
}

addButton.addEventListener('click', () => {
    let ob = JSON.parse(localStorage.getItem("todos"))
    ob[hour.value] = input.value
    checkObject(ob)
})

function checkObject(obj){
    let lst = []
    let lst1 = []
    let lst2 = [],newLst
    let newObj

    let soz,hour,minut
    if(Object.keys(obj).length>0){
        for(let j in obj){
            lst.push(parseInt(j.split(":").join("")))
        }
        hour = data.getHours().toString().padStart(2,"0")
        minut = data.getMinutes().toString().padStart(2,"0")

        for(let d of lst){
            if(parseInt(hour+minut)>=d){
                lst2.push(d)
            }
            else{
                lst1.push(d)
            }
        }
        lst1.sort((a,b)=>a-b)
        lst2.sort((a,b)=>a-b)
        newLst = lst1.concat(lst2)
        newObj = {}
        for(let y of newLst){
            if(y.toString().length!=4){
                y = y.toString().padStart(4,"0")
                }

            else{
                y = y.toString()
            }

            soz = y[0]+y[1]+":"+y[2]+y[3]
            newObj[soz] = obj[soz]
            soz = ""
        }
        
    }
    else{
        newObj = {}
    }
    show(newObj)
    
}
