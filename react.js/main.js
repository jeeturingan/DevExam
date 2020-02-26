var txt = "", 
    col = [],
    todoData,
    tabDef, i, j;

const dataUrl = 'http://localhost:3000/data/';

function dataGet()
{
    var request = new XMLHttpRequest();
    request.open('GET', dataUrl);
    request.onload = function()
    {
        todoData = JSON.parse(request.responseText);
        if (request.readyState == 4 && request.status == "200") 
        {
            createTable();
        }

        else
        {
            console.error(todoData);
        }
    };
    
    request.send('test');
}

function dataPost(object)
{
    var request = new XMLHttpRequest();
    
    request.open('POST', dataUrl);
    request.responseType = 'json';
    if (object) 
    {
        request.setRequestHeader('Content-Type', 'application/json');
    }

    request.send(JSON.stringify(object));
}

function dataPut(object)
{
    var request = new XMLHttpRequest();
    request.open('PUT', dataUrl+'/'+object.id);
    if (object) 
    {
        request.setRequestHeader('Content-Type', 'application/json');
    }
    request.onload = function()
    {
        var task = JSON.parse(request.responseText);
        if (request.readyState == 4 && request.status == "200")
        {
            console.table(task);
        }

        else
        {
            console.error(task);
        }
    };

    request.send(JSON.stringify(object));
}

function dataDelete(id)
{
    var request = new XMLHttpRequest();
    request.open('DELETE', dataUrl+'/'+id);
    request.onload = function ()
    {
        var task = JSON.parse(request.responseText);
        if (request.readyState == 4 && request.status == "200") 
        {
            console.table(task);
        }

        else
        {
            console.error(task);
        }
    };

    request.send(null);
}

function createTable()
{
    for (var i = 0; i < todoData.length; i++)
    {
        for (j in todoData[i])
        {
            if (col.indexOf(j) === -1)
            col.push(j);
        }
    }

    //Create HTML Table
    var table = document.createElement("table");
    table.setAttribute('id', 'todoTable');

    //Create Default Table Row
    var tabRow = table.insertRow(-1);

    var idHead = document.createElement('th');
    idHead.innerHTML = 'ID';
    tabRow.appendChild(idHead);
    var taskHead = document.createElement('th');
    taskHead.innerHTML = 'Task';
    tabRow.appendChild(taskHead);
    var statusHead = document.createElement('th');
    statusHead.innerHTML = 'Status';
    tabRow.appendChild(statusHead);

    //Add existing data from JSON to table as rows
    for (i=0; i<todoData.length; i++)
    {
        //Create a new row for data
        tabRow = table.insertRow(-1);
        for (j=0; j<col.length; j++)
        {
            var tabCell = tabRow.insertCell(-1);
            tabCell.innerHTML = todoData[i][col[j]];
        }

        //Table Definition
        tabDef = document.createElement('td'); 

        //Cancel Button
        tabRow.appendChild(tabDef);
        var btnCancel = document.createElement('input');
        btnCancel.setAttribute('type', 'button');
        btnCancel.setAttribute('value', 'Cancel');
        btnCancel.setAttribute('onclick', 'cancelEdit(this)');
        btnCancel.setAttribute('title', 'Cancel');
        btnCancel.setAttribute('id', 'Cancel'+i);
        btnCancel.setAttribute('style', 'display:none; float:none');
        tabDef.appendChild(btnCancel);

        //Update Button
        tabRow.appendChild(tabDef);
        var btnEdit = document.createElement('input');
        btnEdit.setAttribute('type', 'button');
        btnEdit.setAttribute('value', 'Edit');
        btnEdit.setAttribute('id', 'Edit'+i);
        btnEdit.setAttribute('onclick', 'editTask(this)');
        tabDef.appendChild(btnEdit);

        //Save Button
        tabRow.appendChild(tabDef);
        var btnSave = document.createElement('input');
        btnSave.setAttribute('type', 'button');
        btnSave.setAttribute('value', 'Save');
        btnSave.setAttribute('id', 'Save'+i);
        btnSave.setAttribute('onclick', 'saveTask(this)');
        btnSave.setAttribute('style', 'display:none; float:none');
        tabDef.appendChild(btnSave);

        //Delete Button
        tabDef = document.createElement('th');
        tabRow.appendChild(tabDef);
        var btnDelete = document.createElement('input');
        btnDelete.setAttribute('type', 'button');
        btnDelete.setAttribute('value', 'Delete');
        btnDelete.setAttribute('onclick', 'deleteTask(this)');
        tabDef.appendChild(btnDelete);
    }

    //Create row for Add
    tabRow = table.insertRow(-1);

    for (j=0; j<col.length; j++)
    {
        var newCell = tabRow.insertCell(-1);
        if (j>=1)
        {
            if (j==2)
            {
                //Adds dropdown list for Task Status
                var dropStatus = document.createElement('select');
                dropStatus.innerHTML = '<option value="false">false</option>' +
                '<option value="true">true</option>';
                newCell.appendChild(dropStatus);
            }

            else
            {
                //Adds Textbox
                var textBox = document.createElement('input');
                textBox.setAttribute('type', 'text');
                textBox.setAttribute('value', '');
                newCell.appendChild(textBox);
            }
        }
    }

    tabDef = document.createElement('td');
    tabRow.appendChild(tabDef);

    //Create button
    var btnCreate = document.createElement('input');
    btnCreate.setAttribute('type', 'button');
    btnCreate.setAttribute('value', 'Create');
    btnCreate.setAttribute('id', 'Create'+i);
    btnCreate.setAttribute('onclick', 'createTask(this)');
    tabDef.appendChild(btnCreate);

    //Add the table to a container
    var divCon = document.getElementById('todoList');
    divCon.innerHTML = '';
    divCon.appendChild(table); 
}

function cancelEdit(btn)
{
    //Hides cancel and save buttons
    btn.setAttribute('style', 'display:none; float:none');
    var activeRow = btn.parentNode.parentNode.rowIndex;
    var btSave = document.getElementById('Save' + (activeRow-1));
    btSave.setAttribute('style', 'display:none;');

    ///Shows the update button
    var btEdit = document.getElementById('Edit' + (activeRow-1));
    btEdit.setAttribute('style','display:inline;');

    var tab = document.getElementById('todoTable');
    for (i=0; i<col.length; i++)
    {
        j = 0;
        if (activeRow != 1)
        {
            //computes the position of td
            j = ((activeRow-1)*4+i); 
            var td = tab.getElementsByTagName('td')[j];
        }

        else
            var td = tab.getElementsByTagName('td')[i];
        
        td.innerHTML = todoData[(activeRow-1)][col[i]];
    }
}

function editTask(btn)
{
    var activeRow = btn.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('todoTable').rows[activeRow];

    
    for (i=1; i<3; i++)
    {
        if (i==2)
        {
            //Dropdown for the task status
            var td = tab.getElementsByTagName('td')[i];
            var statusList = document.createElement('select');
            statusList.innerHTML = '<option value="true">true</option>' + 
            '<option value="false">false</option>';
            td.innerText = '';
            td.appendChild(statusList);
        }

        else
        {
            //For the ID and TaskName
            var td = tab.getElementsByTagName('td')[i];
            var texBox = document.createElement('input');
            texBox.setAttribute('type', 'text');
            texBox.setAttribute('value', td.innerText);
            td.innerText = '';
            td.appendChild(texBox);
        }
    }

    var btCancel = document.getElementById('Cancel'+(activeRow-1));
    btCancel.setAttribute('style', 'display:inline;');
    
    var btSave = document.getElementById('Save' + (activeRow-1));
    btSave.setAttribute('style', 'display:inline;');

    //Hide button
    btn.setAttribute('style', 'display:none;');
}

function deleteTask(btn)
{
    var activeRow = btn.parentNode.parentNode.rowIndex;
    todoData.splice((activeRow-1), 1);
    dataDelete(activeRow);
    createTable();
}

function saveTask(btn)
{
    var activeRow = btn.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('todoTable').rows[activeRow];
    var updatedObj = {};


    for (i=1; i<col.length; i++)
    {
        var td = tab.getElementsByTagName('td')[i];
        //Checks if the element is a textbox or select
        //then saves the value
        if (td.childNodes[0].getAttribute('type') == 'text' ||
            td.childNodes[0].tagName == 'SELECT')
        {
            todoData[(activeRow-1)][col[i]] = td.childNodes[0].value;
        }
    }

    updatedObj.id = todoData[(activeRow-1)][col[0]];
    updatedObj.TaskName = todoData[(activeRow-1)][col[1]];
    updatedObj.Done = JSON.parse(todoData[(activeRow-1)][col[2]]);
    dataPut(updatedObj);

    //Refresh the table
    createTable();
}

function createTask(btn)
{
    var activeRow = btn.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('todoTable').rows[activeRow];
    var obj = {};
    obj[col[0]] = activeRow;

    for (i=1; i<col.length; i++)
    {
        var td = tab.getElementsByTagName('td')[i];
        if (td.childNodes[0].getAttribute('type') == 'text' ||
            td.childNodes[0].tagName == 'SELECT')
        {
            var txtValue = td.childNodes[0].value;
            if (txtValue != '')
            {
                obj[col[i]] = txtValue.trim();
            }

            else
            {
                obj = '';
                alert ('all fields are compulsory');
                break;
            }
        }
    }

    if (Object.keys(obj).length > 0)
    {
        obj.Done = JSON.parse(obj.Done);
        todoData.push(obj);
        dataPost(obj);
        createTable();
    }
}