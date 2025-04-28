const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

function xmlToJson(xml) {
  const obj = { list: [] };

  const students = xml.getElementsByTagName('student');

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    
    const nameElement = student.getElementsByTagName('name')[0];
    const firstName = nameElement.getElementsByTagName('first')[0].textContent;
    const secondName = nameElement.getElementsByTagName('second')[0].textContent;
    const age = student.getElementsByTagName('age')[0].textContent;
    const prof = student.getElementsByTagName('prof')[0].textContent;
    const lang = nameElement.getAttribute('lang');

    const studentObj = {
      name: `${firstName} ${secondName}`, 
      age: parseInt(age, 10),
      prof,
      lang
    };

    obj.list.push(studentObj);
  }

  return obj;
}

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");

const result = xmlToJson(xmlDoc);

console.log(result);
