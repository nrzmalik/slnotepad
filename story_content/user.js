window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  var confettiScript = document.createElement('script');
confettiScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js');
document.head.appendChild(confettiScript);
}

window.Script2 = function()
{
  var confettiScript = document.createElement('script');
confettiScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js');
document.head.appendChild(confettiScript);
}

window.Script3 = function()
{
  setVar("Title","");
setVar("Editor","");
}

window.Script4 = function()
{
  // Get the value of the "Title" variable
var title = GetPlayer().GetVar("Title");

// Get the value of the "Editor" variable
var editor = GetPlayer().GetVar("Editor");

// Create a new Blob object
var blob = new Blob([editor], { type: 'text/plain' });

// Create a new anchor element for the download link
var downloadLink = document.createElement("a");

// Set the download link attributes
downloadLink.download = title + ".txt";
downloadLink.innerHTML = "Download File";

// Set the href attribute to the URL of the Blob object
downloadLink.href = window.URL.createObjectURL(blob);

// Append the download link to the document body
document.body.appendChild(downloadLink);

// Click the download link to initiate the download
downloadLink.click();

// Remove the download link from the document body
document.body.removeChild(downloadLink);

}

window.Script5 = function()
{
  // Get the value of the "Title" variable
var title = GetPlayer().GetVar("Title");

// Get the value of the "Editor" variable
var editor = GetPlayer().GetVar("Editor");

// Create a new Blob object
var blob = new Blob([editor], { type: 'application/msword' });

// Create a new anchor element for the download link
var downloadLink = document.createElement("a");

// Set the download link attributes
downloadLink.download = title + ".doc";
downloadLink.innerHTML = "Download File";

// Set the href attribute to the URL of the Blob object
downloadLink.href = window.URL.createObjectURL(blob);

// Append the download link to the document body
document.body.appendChild(downloadLink);

// Click the download link to initiate the download
downloadLink.click();

// Remove the download link from the document body
document.body.removeChild(downloadLink);

}

window.Script6 = function()
{
  var player = GetPlayer();

// Get the value of the "Title" variable
var title = player.GetVar("Title");

// Get the value of the "Editor" variable
var editor = player.GetVar("Editor");

// Create a new jsPDF object
var pdf = new jsPDF();

// Set the document name to the value of the "Title" variable
pdf.setProperties({
  title: title,
});

// Calculate the width and height of the page
var pageWidth = pdf.internal.pageSize.getWidth();
var pageHeight = pdf.internal.pageSize.getHeight();

// Set title font properties
pdf.setFont('Roboto', 'bold');
pdf.setFontSize(30);

// Calculate the height of the title text
var titleHeight = pdf.getTextDimensions(title).h;

// Set the initial y position for the title
var titleY = 20;

// Write the title
pdf.text(title, pageWidth / 2, titleY, 'center');

// Set description font properties
pdf.setFont('Roboto', 'normal');
pdf.setFontSize(16);

// Calculate the available space for description
var availableSpace = pageHeight - titleY - titleHeight - 20; // Adjust for margins

// Split the editor text into lines based on the available space
var lines = pdf.splitTextToSize(editor, pageWidth - 20);

// Set the initial y position for the description
var descriptionY = titleY + titleHeight + 10;

// Loop through the lines
for (var i = 0; i < lines.length; i++) {
  // If the line would exceed the height of the page, add a new page
  if (descriptionY + 10 > pageHeight) {
    pdf.addPage();
    descriptionY = 10;
  }

  // Insert the line into the document
  pdf.text(lines[i], 10, descriptionY);

  // Update the y position
  descriptionY += 10; // Adjust for line spacing
}

// Save the PDF document
pdf.save(title + ".pdf");

}

};
