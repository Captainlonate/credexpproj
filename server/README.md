# Shapes and Simulation .NET Project

API Endpoints:
  - Colors: https://simulatorapi.pirated.technology/colors
  - Shapes: https://simulatorapi.pirated.technology/shapes
  - AntSimulation: https://simulatorapi.pirated.technology/antsimulation?steps=10
    - Valid steps are 1 to 20000, I throw an exception over 20,000

What you're probably looking for:
```
CreditExpert.Api/Controllers
  - ShapesController.cs
  - ColorsController.cs
  - AntSimulationController.cs

And

CreditExpert.Api/utils
  - AntSimulator.cs
    - All of the logic for running the simulation
```

Folder Structure:
```
/CreditExpert.Api
  Contains the asp.net core web api project.
/CreditExpert.Dtos
  Contains the "Data Transfer Objects" that .Api responds with.
```

API Hosting:
```
AWS Linux Server, 3 docker containers
  - asp.net core app
  - nginx-proxy
  - letsencrypt cert automation
```

# My Solution (API)

_You don't have to read all this, but it explains my solution and why I chose it._

There were 2 challenges I had to figure out:

1) [Returning something small, even if I simulated 20,000 steps](#challenge-1-what-to-return)
2) [Determing an appropriate grid size](#challenge-2-the-grid-size)

## Challenge 1 What to return

The requirement was that the server must return something that the front-end can use to display each step.

If the steps to simulate is 20,000, obviously I can't return 20,000 different boards, each 500x500 cells.

I came up with a "Playbook" approach. I'll give the front-end a list of "plays", and when the front-end is animating the board, it'll have just what it needs to play each step.

So, for the first 5 steps, I had considered returning one letter per direction (`U`p, `R`ight, `D`own `L`eft):

`moves: ["D", "L", "U", "R", "U"]`

But it turns out that with all the quotes, it's still pretty large at 15,000 steps. So instead, I returned integers, which don't need quotes.

`moves: [2, 3, 0, 1, 0]`

Which is 5 chars, rather than 15; which matters when I'm sending back 20,000 of them.

The only issue is, what does 0 mean? 1? 2? 3?

So, I just included a small `directions` key/cypher/legend thing.

`directions: ['U', 'R', 'D', 'L']`

The indeces (0-3) match up with the numbers.

`directions[0] === 'U'`

Because this is an interview, I also included the final, completed board `completeBoard`, even though I never used it anywhere. It's just a 2d array where `0` means `White`, and `1` means `Black`.

## Challenge 2 The Grid Size

If you only simulate 15 steps, I don't want to show a 100x100 board with tiny cells.

If you simulate 15,000 steps, a 9x9 board won't cut it.

So I couldn't use the same size board for all step counts.

For the first ~10,000 steps, the grid can be pretty small (about 100x100). At about 10,200 the ant starts to dig a straight line going top and left. The minimum board size quickly doubles, triples, etc.

I predetermined the grid size based on the number of steps. I hardcoded these values and don't accept a step count over 20,000 (which was already so big that I really can't display it).

If I needed the board to be dynamically sized, I would use a Dictionary to store the value of every cell encountered. Then, at the end I would construct the array based on the `min` and `max` `x` and `y` values.