/* custom JavaScript goes here */

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
//Closure - limits scope leak

"use strict";

((core) =>
{
    function displayHome()
    {
        let paragraphOneText =
          "This is a simple site to demonstrate DOM Manipulation for ICE 1";

        let paragraphOneElement = document.getElementById("paragraphOne");

        paragraphOneElement.textContent = paragraphOneText;
        paragraphOneElement.className = "fs-5";

        // Step 1. document.createElement
        let newParagraph = document.createElement("p");
        // Step 2. configure the element
        newParagraph.setAttribute("id", "paragraphTwo");
        newParagraph.textContent = "...And this is paragraph two";
        // Step 3. select the parent element
        let mainContent = document.getElementsByTagName("main")[0];
        // Step 4. Add / Insert the element
        mainContent.appendChild(newParagraph);

        newParagraph.className = "fs-6";

        // another way of injecting content
        let paragraphDiv = document.createElement("div");
        let paragraphThree = `<p id="paragraphThree" class="fs-7 fw-bold">And this is the Third Paragraph</p>`;
        paragraphDiv.innerHTML = paragraphThree;

        // insertions

        // example of inserting before a node
        //newParagraph.before(paragraphDiv);

        // example of inserting after a node
        newParagraph.after(paragraphDiv);

        // deletions

        // example of removing a single element
        //paragraphOneElement.remove();

        // example of removeChild
        mainContent.removeChild(paragraphOneElement);

        // update / modification
        //mainContent.firstElementChild.textContent = "Welcome Home!";

        mainContent.innerHTML = `<h1 id="firstHeading">Welcome to WEBD6201 - Lab 1</h1>
         <p id="paragraphOne" class="fs-3 fw-bold">This is my first Paragraph</p>
        `;
        
    }

    function displayAbout()
    {

    }

    function displayProjects()
    {

    }

    function displayServices()
    {

    }


    // REGEX Examples
    // First Last name validation: /([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*/

    function testFullName()
    {
      let messageArea = $("#messageArea").hide();
      let fullNamePattern = /([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*/;

        // form validation
        $("#fullName").on("blur", function()
        {

          if(!fullNamePattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter an appropriate Name");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testContactNumber()
    {
      let messageArea = $("#messageArea").hide();
      let contactNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

        // form validation
        $("#contactNumber").on("blur", function()
        {

          if(!contactNumberPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid phone number.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testEmailAddress()
    {
      let messageArea = $("#messageArea").hide();
      let emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

        // form validation
        $("#emailAddress").on("blur", function()
        {

          if(!emailPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid email address.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function formValidation() 
    {
      testFullName();
      testContactNumber();
      testEmailAddress();
    }

    function displayContact()
    {
      
    // Form validation
    formValidation();

      $("#sendButton").on("click", (event)=> 
      {
        if($("#subscribeCheckbox")[0].checked)
        {
          let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
            if(contact.serialize())
            {

              let key = contact.FullName.substring(0, 1) + Date.now();

              localStorage.setItem(key, contact.serialize());
            }
          }
        });
    }

    function displayContactList() 
    {
      if (localStorage.length > 0) 
      {
        let contactList = document.getElementById("contactList");

        let data = "";

        // Object keys to loop through
        let keys = Object.keys(localStorage);
        // Reset index to 1 each time elements are loaded in DOM to reorder indexes as needed
        let index = 1;

        // Preferred syntax to replace forEach loop
        for (const key of keys)
        {
          let contactData = localStorage.getItem((key).toString());

          let contact = new core.Contact();
          contact.deserialize(contactData);

          data += `
            <tr>
              <th scope="row" class="text-center">${index}</th>
              <td>${contact.FullName}</td>
              <td>${contact.ContactNumber}</td>
              <td>${contact.EmailAddress}</td>
              <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
              <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
            </tr>`;

          index++;
        }

        contactList.innerHTML = data;

        //TODO - need to create an edit page
        $("button.edit").on("click", function(){
          location.href = "edit.html#" + $(this).val();
         });

        //TODO - need to fix this item - it breaks when we delete a middle item
        $("button.delete").on("click", function(){
          if(confirm("Are you sure?"))
          {
            localStorage.removeItem($(this).val());
            location.href = "contact-list.html"; // refresh the page
          }
        });
         
        $("#addButton").on("click", function()
        {
          location.href = "edit.html#";
        });
      }
    }

    /**
    * displayEdit - shows contact entry form populated with existing data record details  
    */
    function displayEdit() 
    {
      let key = location.hash.substring(1);

      // Create contact for exploring 
      let contact = new core.Contact();
      
      // Check that key is not empty
      if(key != "") 
      {
        contact.deserialize(localStorage.getItem(key));
     
        $("#fullName").val(contact.FullName);
        $("#contactNumber").val(contact.ContactNumber);
        $("#emailAddress").val(contact.EmailAddress);
      } 
      else 
      {
        // Modify page to show "Add Contact" and "Add Button", rather than default edit
        $("main>h1").text("Add Contact");
        $("#editButton").html(`<i class="fa fa-plus pa-lg"></i> Add`)
      }

      // Form validation
      formValidation();
      
      $("#editButton").on("click", function()
      {        
        // Check if key is empty 
        if(key == "")
        {
          // Create new key
          key = contact.FullName.substring(0, 1) + Date.now();
        }

        // Copy contact info
        contact.FullName = $("#fullName").val();
        contact.ContactNumber = $("#contactNumber").val();
        contact.EmailAddress = $("#emailAddress").val();

        localStorage.setItem(key, contact.serialize());

        location.href = "contact-list.html";      
        
      });

      $("#cancelButton").on("click", function()
      {
        location.href = "contact-list.html";
      });
    }

    function displayRegister()
    {

    }


    function displayLogin()
    {

    }

    function Start()
    {
        console.log("App Started...");

        switch (document.title) 
        {
          case "Home":
              displayHome();
            break;
          case "About":
              displayAbout();
            break;
          case "Projects":
              displayProjects();
            break;
          case "Services":
              displayServices();
            break;
          case "Contact":
              displayContact();
            break;
          case "Contact-List":
            displayContactList();
            break;
          case "Edit Contact":
            displayEdit();
            break;
          case "Login":
            displayLogin();
            break;
          case "Register":
            displayRegister();
            break;
        }
    }

    window.addEventListener("load", Start);

    core.Start = Start;

})(core || (core={}));