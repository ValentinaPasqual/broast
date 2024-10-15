
// DOCUMENTS SECTION FILTER FUNCTIONS
var map;

function BuildCards(result_cards) {
  // Hide existing content
    $('#catalogue').hide();
    $('#catalogue2').empty;


    // Check if result_cards is empty
    if (result_cards.length === 0) {
      // Display message when no data is available
      var html = '<p class="float-end text-end fw-bold n-results"> <span class="badge bg-secondary">'+result_cards.length+'</span> archival documents </p>'
      html += '<div class="row p-5"">';
      html += '<h1>No Data Available</h1>';
      html += '<div class="member-info" data-aos="fade-up">';
      html += '<p>Unfortunately, no data is available for this category. Please try checking another one.</p>';
      html += '</div></div>';

      // Update the HTML of the catalogue container
      $('#catalogue2').html(html);
      $('#catalogue2').css({'visibility': 'visible', 'display': 'block'});
    } else {
      
      // Combine all groups into a single HTML string

      console.log(result_cards)

      var uniqueCards = {};
      // Iterate through each card and check for duplicates
      $.each(result_cards, function(index, card) {
        // Check if the card with the same title (card.o) already exists
        if (uniqueCards[card.s]) {
            // If a duplicate is found, append the obj_label (or any other field) to the existing card
            uniqueCards[card.s].obj_labels = uniqueCards[card.s].obj_labels || [];
            uniqueCards[card.s].obj_labels.push(card.obj_label);
        } else {
            // If no duplicate is found, store the card in the uniqueCards object
            uniqueCards[card.s] = card;
            uniqueCards[card.s].obj_labels = uniqueCards[card.s].obj_labels || [];
            uniqueCards[card.s].obj_labels.push(card.obj_label);
        }

      });

      var html = '<div class="row pl-5 pr-5"> <p class="float-end text-end fw-bold n-results"> <span class="badge bg-secondary">'+Object.keys(uniqueCards).length+'</span> archival documents </p>'

      // Process each card
      $.each(uniqueCards, function(index, card) {

        html += '<div class="chef-member row" data-aos="fade-up">'; // Add a row container

        // Column for member info
        html += '<div class="member-info col-10 p-3">'; // Adjust column size as needed
        html += '<h4 class="card-title">' + card.o + '</h4>';
        html += '<p class="card-text">' + card.abstract + '<br>';
        html += '<a href="' + card.s.replace('https://w3id.org/broast/urk/', '../') + '">See more >></a></p>';
        html += '</div>';
        
        // Column for badges
        html += '<div class="badges col-2 p-3">'; // Adjust column size to fit alongside the info column
        if (card.obj_labels) {
          $.each(card.obj_labels, function(i, label) {
            html += '<span class="badge bg-secondary text-wrap p-1">' + label + '</span>'; // Display badges vertically
          });
        }
        html += '</div>';
        
        html += '</div>'; // Close the row container

        // Update the HTML of the catalogue container
        $('#catalogue2').html(html);
        $('#catalogue2').css({'visibility': 'visible', 'display': 'block'});
        
      });
    }   
  } 

function BuildfacetTermsList(clickedValue, facetTermsList) {
  let div_id = clickedValue.split('@')[0];
    var facetTermsListTargetDiv = document.getElementById(div_id + 'facets-container');
    
    // Clear the current content
    facetTermsListTargetDiv.innerHTML = '';

    // Create a new div to hold the list group
    var listGroupDiv = document.createElement('div');
    listGroupDiv.className = 'list-group';
    listGroupDiv.setAttribute('data-aos', 'fade-down');

    // Iterate over the facetTermsList list
    $.each(facetTermsList, function(index, facetTerm) {
      // Create an anchor element
      var button = document.createElement('button');
      button.type = 'button' 
      button.textContent = facetTerm.label;  // Use the 'label' value for text content
      button.value = facetTerm.property  // Use the 'property' value for href
      button.className = 'filtersElementsButtons list-group-item list-group-item-action'; // Bootstrap 5 classes
      
      // Append the anchor to the list group
      listGroupDiv.appendChild(button);
    });

    // Append the list group to the target div
    facetTermsListTargetDiv.appendChild(listGroupDiv);
}


$(document).ready(function() {
  // Function to handle AJAX request and update the catalogue
  function fetchDataAndUpdateCatalogue(clickedName, clickedValue, clickedElement) {

    // dataToSend = {}
    // dataToSend[clickedName] = clickedValue;

    var dataToSend = {}; 
    dataToSend = {
        'selected_knowledge_type': clickedName, // First value
        'selected_matadata_field': clickedValue, // Second value
        'selected_value': clickedElement  // Third value
    };

    // Send an AJAX request to your Flask endpoint
    $.ajax({
      url: '/filter',
      method: 'POST',
      data: dataToSend, // Send the constructed ImmutableDict
      success: function(response) {
        
        var result_cards = response.result_cards;
        var facetTermsList = response.facet_elements;

        if (dataToSend['selected_value'] === '') {
          BuildCards(result_cards);
          BuildfacetTermsList(clickedValue, facetTermsList);
      } else {
          BuildCards(result_cards);
      }
      },
      error: function(xhr, status, error) {
        // Handle errors
        console.error(error);
      }
    });
  }

  // Event handler for radio buttons
  $('.filters input[type="radio"]').change(function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the clicked input name and value
    var clickedName = $(this).attr('name');
    var clickedValue = $(this).val();

    // Uncheck all radio buttons
    $('.filters input[type="radio"]').prop('checked', false);
    
    // Check the clicked radio button
    $(this).prop('checked', true);

    


    // Fetch data and update catalogue
    fetchDataAndUpdateCatalogue(clickedName, clickedValue, '');
  });


// handles clicking on a filtering element 
  $(document).on('click', '.filtersElementsButtons', function(event) {

    let iterator = 0;

    $(this).siblings().removeClass('active');

    // Reinitialize AOS to account for the changes
    AOS.refresh();

    // Get the href value of the clicked link
    var clickedElement = $(this).text();

    // Find the closest parent div container for the clicked link
    var checkedSwitch = $('.filters input[type="radio"]:checked');

    //Get the clicked input name and value
    var clickedName = checkedSwitch.attr('name');
    var clickedValue = checkedSwitch.val();

    // Select all chef-member rows within the catalogue2 div
    const chefMembers = document.querySelectorAll('#catalogue2 .chef-member');

    chefMembers.forEach(chefMember => {
      chefMember.style.display = ''; 
  
      // Select all badges within the current chefMember
      let badges = chefMember.querySelectorAll('#catalogue2 .badge');
  
      // Iterate over each badge to add/remove classes
      badges.forEach(badge => {
          badge.classList.add('bg-secondary'); 
          badge.classList.remove('bg-primary'); 
      });
  });

    // Loop through each chef-member row to check the badges inside
    chefMembers.forEach(chefMember => {

        // Select all badges within the current chefMember
        let badges = chefMember.querySelectorAll('.badge');

        // Variable to track if a matching badge is found
        let matchFound = false;

        // Loop through each badge and check if its value matches clickedValue
        badges.forEach(badge => {
            const badgeNumber = badge.textContent;
            if (badgeNumber === clickedElement) {
                matchFound = true;
                badge.classList.add('bg-primary');
                badge.classList.remove('bg-secondary');
            }
        });

        // If no badge matched, hide the chef-member div
        if (!matchFound) {
            chefMember.style.display = 'none';
        }else{
          iterator++;
        }

        const firstBadge = document.querySelector('#catalogue2 .n-results span');
        firstBadge.textContent = `${iterator}`

        $(this).addClass('active');
    });



    //fetchDataAndUpdateCatalogue(clickedName, clickedValue, clickedElement)
  });


    // $('#filterForm').on('submit', function(event) {
    //   event.preventDefault();
    //   var checkedRadio = $('#filterForm input[type="radio"]:checked');
    //   if (checkedRadio.length > 0) {
    //     var clickedName = checkedRadio.attr('name');
    //     var clickedValue = checkedRadio.val();
    //     $(this).addClass('.form-check-input:checked')
    //     fetchDataAndUpdateCatalogue(clickedName, clickedValue, '');
    //   }
    // });
  

  // Reset button click handler
  $('#resetButton').click(function() {
  // Deactivate all radio buttons
  $('.filters input[type="radio"]').prop('checked', false);

  
  // Reinitialize AOS to account for the changes
  AOS.refresh();

  // Show #catalogue and set AOS attribute
  $('#catalogue').show();

  // Hide #catalogue2
  $('.animatedDiv').hide();
  $('#catalogue2').hide();
  });
});


/* HANDLES DIVS IN THE FILTERS TO DISAPPEAR WHEN A CHECHBOX IS SELECTED */
document.addEventListener('DOMContentLoaded', function () {
  // Function to hide all containers
  function hideAllContainers() {
      document.querySelectorAll('div[id*="facets-container"]').forEach(function (container) {
          container.style.display = 'none';
      });
  }

  // Event listener for all radio buttons
  document.querySelectorAll('.form-check-input').forEach(function (radio) {
      radio.addEventListener('change', function () {
          // Hide all containers
          hideAllContainers();
          
          // Get the corresponding container id
          const containerId = this.value.split('@')[0] + 'facets-container';

          // Show the corresponding container
          const container = document.getElementById(containerId);
          if (container) {
              container.style.display = 'block';
          }
      });
  });

  // Hide all containers initially
  hideAllContainers();
});


// ADD TOOLTIP TO TIMECHART


// DOCUMENTS SECTION - if click on accordion button also input event is triggered
/* document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', function() {
    button.querySelector('input[type="submit"]').click();
  });
}); */


// MOVE TO TOP THE SELECTED ITEMS IN THE FACETS
function moveToTop(checkbox) {
    // Get the parent <ul> element
    var ul = checkbox.closest('ul');
    // Get the <li> element containing the checkbox
    var listItem = checkbox.closest('li');
    // Move the <li> element to the top of the <ul>
    ul.insertBefore(listItem, ul.firstChild);
}

// Function to check and hide the dropdown if it has no elements
var dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(function(dropdown) {
     var dropdownMenu = dropdown.querySelector('.dropdown-menu');

     if (dropdownMenu.children.length === 0) {
         dropdown.style.display = 'none';
     } else {
         dropdown.style.display = 'inline-block'; // Use 'inline-block' to match Bootstrap styling
     }
 });


 // Function to filter content in the artwork page - auto interpretations
 function filterContent(filterURI) {
     const catalogItems = document.querySelectorAll('.symbol-interpretation');

     catalogItems.forEach(item => {
         const catalogURIs = item.getAttribute('data-catalog-uris');
         var button = item.querySelector('a');
         var badge = item.querySelector('.badge');

         // Check if filterURI exists in the item's catalog URIs
         if (catalogURIs.includes(filterURI)) {
           // Add the 'show-item' class and remove 'hide-item' class
           item.classList.add('card-enabled');
           item.classList.remove('card-disabled');
           button.classList.add('d-1');
           badge.classList.add('bg-warning');
           button.classList.add('btn-outline-dark');
           badge.classList.remove('bg-warning-disabled');
           button.classList.remove('d-1-disabled');
           button.classList.remove('btn-outline-disabled');
         } else {
           // Add the 'hide-item' class and remove 'show-item' class
           item.classList.add('card-disabled');
           item.classList.remove('card-enabled');
           button.classList.add('d-1-disabled');
           button.classList.add('btn-outline-disabled');
           badge.classList.add('bg-warning-disabled');
           button.classList.remove('d-1');
           button.classList.remove('btn-outline-dark');
           badge.classList.remove('bg-warning');

         }
     });
 }

 // Attach click event listeners to filter buttons
 const filterButtons = document.querySelectorAll('.preico-filter');
 filterButtons.forEach(button => {
     button.addEventListener('click', () => {
         const filterURI = button.getAttribute('data-filter-uri');
         filterContent(filterURI);
     });
 });


// SEARCH FILTER IN facets
function searchFilterFunction(inputField) {
  var filter, ul, ul_id, li, i, txtValue;
  filter = inputField.value.toUpperCase();
  ul = inputField.nextElementSibling;
  ul_id = ul.id
  li = ul.querySelectorAll("li");

  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

/*
  ==========================
  |     NETWORK TOOLS      |
  ==========================
*/

// Zoom In function
function zoomIn() {
  var scale = network.getScale();
  network.moveTo({
    scale: scale * 1.1, // Increase the scale by 10%
    animation: true, // Enable animation
    animationDuration: 1000 // Animation duration in milliseconds
  });
}

// Zoom Out function
function zoomOut() {
  var scale = network.getScale();
  network.moveTo({
    scale: scale * 0.9, // Decrease the scale by 10%
    animation: true, // Enable animation
    animationDuration: 1000 // Animation duration in milliseconds
  });
}

// Reset Zoom function
function resetZoom() {
network.moveTo({
 scale: 0.7, // Set the scale to the default value (1)
 animation: true, // Enable animation
 animationDuration: 1000 // Animation duration in milliseconds
});
}

// GOOGLE ANALYTICS

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-73SQ61K2RE');
