
// Get the elements
const usernameInput = document.getElementById('username');
const startBtn = document.getElementById('startBtn');


// Add event listener to the Start button
startBtn.addEventListener('click', startProcess);

// Add event listener to the Enter key press
usernameInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    startProcess(); 
  }
});


// Add event listener to the Start button
function startProcess() {
  // Get the value of the username input
  const username = usernameInput.value;


// Get the input value from the username box
var copied_user = document.getElementById("username").value;

// Pre-written text with the username included
var textToCopy = ` 
const username = "USER_NAME_HERE";

/**
 * Initialized like this so TypeScript can infer the type
 */
let followers = [];
let followings = [];
let dontFollowMeBack = [];
let iDontFollowBack = [];

(async () => {
  try {
    const userQueryRes = await fetch(
      \`https://www.instagram.com/web/search/topsearch/?query=\${username}\`
    );

    const userQueryJson = await userQueryRes.json();

    const userId = userQueryJson.users[0].user.pk;

    let after = null;
    let has_next = true;

    while (has_next) {
      await fetch(
        \`https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=\` +
          encodeURIComponent(
            JSON.stringify({
              id: userId,
              include_reel: true,
              fetch_mutual: true,
              first: 50,
              after: after,
            })
          )
      )
        .then((res) => res.json())
        .then((res) => {
          has_next = res.data.user.edge_followed_by.page_info.has_next_page;
          after = res.data.user.edge_followed_by.page_info.end_cursor;
          followers = followers.concat(
            res.data.user.edge_followed_by.edges.map(({ node }) => {
              return {
                username: node.username,
                full_name: node.full_name,
              };
            })
          );
        });
    }

    after = null;
    has_next = true;

    while (has_next) {
      await fetch(
        \`https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=\` +
          encodeURIComponent(
            JSON.stringify({
              id: userId,
              include_reel: true,
              fetch_mutual: true,
              first: 50,
              after: after,
            })
          )
      )
        .then((res) => res.json())
        .then((res) => {
          has_next = res.data.user.edge_follow.page_info.has_next_page;
          after = res.data.user.edge_follow.page_info.end_cursor;
          followings = followings.concat(
            res.data.user.edge_follow.edges.map(({ node }) => {
              return {
                username: node.username,
                full_name: node.full_name,
              };
            })
          );
        });
    }

    dontFollowMeBack = followings.filter((following) => {
      return !followers.find(
        (follower) => follower.username === following.username
      );
    });

    console.table(dontFollowMeBack);
    console.log(\`Total Unfollowers: \${dontFollowMeBack.length}\`);

    const userListText = dontFollowMeBack
      .map(({ username, full_name }) => \`\${username} - \${full_name}\`)
      .join("\\n");

    const newTab = window.open();
    if (newTab) {
      newTab.document.open();
      newTab.document.write(
        \`<html><body><h1>Total Unfollowers: \${dontFollowMeBack.length}\</h1><table>\${dontFollowMeBack
          .map(
            ({ username, full_name }) =>
              \`<tr><td>\${username}</td><td>\${full_name}</td></tr>\`
          )
          .join("")}</table></body></html>\`
      );
      newTab.document.close();
    } else {
      console.log(
        "Unable to open a new tab. Please allow pop-ups and try again."
      );
    }
  } catch (err) {
    console.log({ err });
  }
})();
`;

const updatedtextToCopy = textToCopy.replace("USER_NAME_HERE", copied_user);

// Copy the text to the clipboard
navigator.clipboard.writeText(updatedtextToCopy)
  .then(function() {
    console.log("Text copied to clipboard successfully: " + updatedtextToCopy);
    alert("Copied!");
    window.location.href = 'directions.html';
  })
  .catch(function(error) {
    console.error("Unable to copy text: " + error);
  });

}


//  var copyText = document.getElementById("username");

  // Select the text field
 // copyText.select();
  //copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  //navigator.clipboard.writeText(copyText.value);
