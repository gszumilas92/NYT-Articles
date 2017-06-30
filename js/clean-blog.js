var filterParam = "&begin_date=19921228&end_date=19921228";
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=30b14b65e7ef479bb96ffeef5ca54a42&page=2"
const articleEl = document.getElementById('article');

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function fixedDate(date) {
    return date = date.replace(/[./-]/g, '')
}

function confirmEnter(textAreaID, buttonID) {
    document.getElementById(textAreaID)
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById(buttonID).click();
        }
    });
}

function isDateCorrect(date) {
    date = fixedDate(date)
    if(!/[^0-9]/g.test(date) && !date == '') {
        return true;
    } else {
        return false;
    }
}

function filterArticles(dateFrom, dateTo) {

    if(isDateCorrect(dateFrom) && isDateCorrect(dateTo)){
        this.filterParam = "&begin_date="+fixedDate(dateFrom)+"&end_date="+fixedDate(dateTo);
        console.log(this.filterParam)
        //Removing old DOM elements
        var myNode = document.getElementById("article");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        //Fechting Data
        fetchData(this.url+this.filterParam);
    } else {
        alert("Please provide a correct date format! Correct date formats are: YYYY/MM/DD, YYYY|MM|DD, YYYY.MM.DD, also correct dates doesnt include any letters!")
    }
}

function createPostElement(article){
    
    //Creating Elements
    let div = createNode('div'), 
        a = createNode('a'),
        h2 = createNode('h2'),
        hr = createNode('hr')

    //Adding Style Classes
    div.className="post-preview"
    h2.className="post-title"

    //Create Click Attribution
    let att = document.createAttribute("href");
    let att2 = document.createAttribute("target");
    att.value = article.web_url;
    att2.value ="_blank";
    a.setAttributeNode(att);
    a.setAttributeNode(att2);

    //Appending Elements
    append(h2, document.createTextNode(`${article.headline.main}`));
    append(a, h2);
    append(div, a);
    append(articleEl, div);
    append(articleEl, hr);
}

function fetchData(url){
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        let article = data.response.docs;
        return article.map(function(article) {
            createPostElement(article)
        })
    })
}

confirmEnter("dateFrom", "articlesButton")
confirmEnter("dateTo", "articlesButton")

fetchData(url);