# Lab4-NodeREST

You should have utilized [this link](https://classroom.github.com/assignment-invitations/588c60a9e2596c98885530f6504fec06) to get started.

In this lab you will implement the cities RESTful service in Node.js that connects to your weather AJAX application. You will take a URL with a ?q=chars suffix and will look up all of the utah cities that have chose chars as a prefix. You will then return a JSON string corresponding to the entries.

You should utilize [this link](https://classroom.github.com/assignment-invitations/588c60a9e2596c98885530f6504fec06) to get started. It will create a repository that already has the express generator run. If you haven't seen it run or perused the generated files before, check out this [documentation](https://expressjs.com/en/starter/generator.html).

The jquery application from a previous lab should be modified to make the jsonp request to your own REST server instead of the <a href="https://students.cs.byu.edu/~clement/CS360/ajax/getcity.cgi?q=P">one used</a> for your jquery lab. Before you do that, you should copy the related files over to your newly created express server. 

Once you have the getcity service working, implement a proxy for the [Owlbot](https://owlbot.info/api/v1/dictionary/owl) api that will allow the user to search for a word and see the definition. 

These [hints](https://github.com/BYUCS260/Lab4-NodeREST/wiki/Cities-REST-Service-Hints) may be helpful if you get stuck.

You should run your node application with something like:

nohup node ./bin/www >& output &

<strong>After you use nohup, make sure to exit by typing "exit" into the terminal (for PUTTY, there should be an equivalent if that doesn't work), otherwise the OS will kill the process in a short while.</strong>

Nohup directs the kernel to not send a HUP signal when you log out. the >& redirect stdout and stderr to the file output and the & on the end tells the script to run it in background. An alternative to nohup is to use a node package called "forever', but we sadly don't have time to cover all the various ways to do something.

To stop the server, run something like:

killall -ir 'node'

This will kill all processes that have 'node' in their name. The -i gives you a chance to confirm that you want to kill the job before it does it.

<strong>Passoff:</strong>

**You should test your server to make sure it works with your jquery script. 

Your submission to learningsuite should contain the url of your jquery front-end, and your REST service on your amazon EC2 server. You should have utilized [this link](https://classroom.github.com/assignment-invitations/588c60a9e2596c98885530f6504fec06) to get started through github classroom.

<strong>Grading:</strong>

<strong>Passoff Level</strong> | <strong>Behavior</strong> |	<strong>Points</strong>
--- | --- | ---
Minimal Passoff | You've got a server running that serves the static files (including your jQuery weather.html) | 25%
Basic Passoff | Your service correctly returns the JSON containing the list of cities | 55%
Good Passoff | You return the complete list of correct cities with the prefix given in the ?q=chars string (this involves the other 2 passoff levels to work) | 80%
Full Passoff | You implement a proxy for the Owlbot service, allowing the user to search for a word and be shown the definition | 90%
Perfect Passoff | Your code is included in your submission, and your page looks really good. This is subjective, so wow us. | 100%
