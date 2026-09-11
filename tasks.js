/* ============================================================
   One Thing — the task bank
   ------------------------------------------------------------
   Every task should be finishable in one sitting, under ~20 min.
   If a task feels like it needs a whole afternoon, split it.

   To add your own, copy a line and change it. Rules:
     id    must be unique and must never change once it's been
           used, or completed history for it gets orphaned.
     zone  must be one of the keys in ZONES below.
     mins  rough estimate, just for setting expectations.
     done  the finish line. This is the important one — it's what
           keeps the task from quietly growing into a whole day.
   ============================================================ */

const ZONES = {
  kitchen:  { label: 'Kitchen',   hue: 24  },
  bath:     { label: 'Bathroom',  hue: 190 },
  bedroom:  { label: 'Bedroom',   hue: 265 },
  closet:   { label: 'Closets',   hue: 320 },
  living:   { label: 'Living',    hue: 145 },
  entry:    { label: 'Entry',     hue: 45  },
  laundry:  { label: 'Laundry',   hue: 205 },
  paper:    { label: 'Paper',     hue: 12  },
  digital:  { label: 'Digital',   hue: 230 },
  car:      { label: 'Car',       hue: 175 },
  storage:  { label: 'Storage',   hue: 95  },
  kids:     { label: 'Kids',      hue: 340 },
  anywhere: { label: 'Anywhere',  hue: 60  },
  custom:   { label: 'Yours',     hue: 280 }
};

const TASKS = [
  /* ---------- Kitchen ---------- */
  { id: 'k-junk-drawer',    zone: 'kitchen', mins: 15, title: 'The junk drawer',                 done: 'Everything out. Dead pens and mystery keys in the trash. Only things you would actually miss go back.' },
  { id: 'k-under-sink',     zone: 'kitchen', mins: 20, title: 'Under the kitchen sink',          done: 'Nothing expired, nothing leaking, and you can see the back wall.' },
  { id: 'k-fridge-door',    zone: 'kitchen', mins: 15, title: 'The fridge door shelves',         done: 'Every condiment checked for a date. Wipe the shelves before things go back.' },
  { id: 'k-fridge-top',     zone: 'kitchen', mins: 15, title: 'One fridge shelf — the top one',  done: 'One shelf. Not the whole fridge. Empty, wipe, restock.' },
  { id: 'k-freezer-door',   zone: 'kitchen', mins: 15, title: 'The freezer door',                done: 'Anything with freezer burn or no label goes. You can read every bag.' },
  { id: 'k-spices',         zone: 'kitchen', mins: 20, title: 'The spice shelf',                 done: 'Duplicates combined, anything older than two years tossed, labels facing out.' },
  { id: 'k-coffee',         zone: 'kitchen', mins: 15, title: 'The coffee and tea station',      done: 'Stale bags gone, the counter wiped, everything you use daily within reach.' },
  { id: 'k-containers',     zone: 'kitchen', mins: 20, title: 'Food containers and lids',        done: 'Every container has a lid. Every lid has a container. Orphans go in the recycling.' },
  { id: 'k-utensil-crock',  zone: 'kitchen', mins: 10, title: 'The utensil crock',               done: 'Anything you have not used in a year is out. Wash the crock while it is empty.' },
  { id: 'k-cutlery',        zone: 'kitchen', mins: 15, title: 'The cutlery drawer',              done: 'Tray lifted out and crumbs shaken into the sink. Stray gadgets rehomed.' },
  { id: 'k-mugs',           zone: 'kitchen', mins: 15, title: 'The mug shelf',                   done: 'Pick your favorites. Chipped ones go. The shelf should not be two deep.' },
  { id: 'k-pantry-cans',    zone: 'kitchen', mins: 20, title: 'Pantry: the canned goods',        done: 'Expired cans out, like with like, oldest in front so it gets used.' },
  { id: 'k-pantry-snacks',  zone: 'kitchen', mins: 15, title: 'Pantry: the snack shelf',         done: 'Stale boxes gone, half-empty bags consolidated or tossed.' },
  { id: 'k-baking',         zone: 'kitchen', mins: 20, title: 'The baking supplies',             done: 'Flour and sugar sealed, hardened brown sugar gone, sprinkles from 2019 gone.' },
  { id: 'k-takeout',        zone: 'kitchen', mins: 10, title: 'The takeout packet stash',        done: 'The soy sauce and ketchup drawer. Keep a small handful, toss the rest.' },
  { id: 'k-bags',           zone: 'kitchen', mins: 10, title: 'The bag of plastic bags',         done: 'Keep what fits in one bag. The rest goes to store recycling.' },
  { id: 'k-reusable-bags',  zone: 'kitchen', mins: 10, title: 'Reusable grocery bags',           done: 'Folded, counted, and moved to wherever you would actually grab them on the way out.' },
  { id: 'k-bottles',        zone: 'kitchen', mins: 15, title: 'Water bottles and travel mugs',   done: 'Missing lids, cloudy plastic, and the ones nobody likes are out.' },
  { id: 'k-cookbooks',      zone: 'kitchen', mins: 15, title: 'The cookbook shelf',              done: 'Keep the ones you have actually cooked from. Be honest.' },
  { id: 'k-appliance',      zone: 'kitchen', mins: 10, title: 'The counter appliance you never use', done: 'Pick one. Either move it to a cabinet or put it in the donate box.' },
  { id: 'k-towels',         zone: 'kitchen', mins: 10, title: 'The kitchen towel drawer',        done: 'Stained and thin ones become rags. The rest get folded the same way.' },
  { id: 'k-oven-drawer',    zone: 'kitchen', mins: 15, title: 'The drawer under the oven',       done: 'Pans you use stay. Warped sheet pans and lids to nothing go.' },
  { id: 'k-fridge-front',   zone: 'kitchen', mins: 10, title: 'The front of the fridge',         done: 'Old invitations, expired coupons, and curled photos down. Keep it to a few things.' },
  { id: 'k-leftovers',      zone: 'kitchen', mins: 10, title: 'Leftovers patrol',                done: 'Every mystery container in the fridge opened, emptied, and in the dishwasher.' },
  { id: 'k-cleaning-caddy', zone: 'kitchen', mins: 15, title: 'The cleaning supplies',           done: 'Combine the three half-empty sprays. Toss what you never reach for.' },

  /* ---------- Bathroom ---------- */
  { id: 'b-medicine',       zone: 'bath', mins: 20, title: 'The medicine cabinet',              done: 'Everything expired pulled out. Check the dates, all of them.' },
  { id: 'b-under-sink',     zone: 'bath', mins: 20, title: 'Under the bathroom sink',           done: 'Empty it, wipe it, and put back only what lives in this bathroom.' },
  { id: 'b-shower',         zone: 'bath', mins: 10, title: 'The shower shelf',                  done: 'Empty bottles out. The shampoo you did not like goes too.' },
  { id: 'b-makeup',         zone: 'bath', mins: 20, title: 'The makeup drawer',                 done: 'Dried-out, wrong shade, or older than a year — gone. Wipe the drawer.' },
  { id: 'b-hair-tools',     zone: 'bath', mins: 15, title: 'Hair tools and accessories',        done: 'Cords untangled, broken clips tossed, ties in one spot.' },
  { id: 'b-linens',         zone: 'bath', mins: 15, title: 'The towel stack',                   done: 'Thin and scratchy ones become rags or go to an animal shelter.' },
  { id: 'b-travel',         zone: 'bath', mins: 15, title: 'The travel size bin',               done: 'Keep a trip\'s worth. The rest are donated or thrown out.' },
  { id: 'b-first-aid',      zone: 'bath', mins: 15, title: 'The first aid kit',                 done: 'Restocked, expired stuff gone, and you know where it is.' },
  { id: 'b-nails',          zone: 'bath', mins: 10, title: 'Nail polish and tools',             done: 'Gloppy and separated bottles go. Keep the ones you reach for.' },
  { id: 'b-counter',        zone: 'bath', mins: 10, title: 'The bathroom counter',              done: 'Completely clear, then wiped. Only daily things come back.' },
  { id: 'b-sunscreen',      zone: 'bath', mins: 10, title: 'Sunscreen and bug spray',           done: 'Check the dates — sunscreen expires. One bin, one place.' },
  { id: 'b-hair-products',  zone: 'bath', mins: 15, title: 'The hair product shelf',            done: 'If it has been open a year and is still full, it is not working out.' },
  { id: 'b-worst-drawer',   zone: 'bath', mins: 20, title: 'The worst bathroom drawer',         done: 'You know the one. Empty, wipe, and be ruthless putting things back.' },
  { id: 'b-bath-toys',      zone: 'bath', mins: 10, title: 'The bath toys',                     done: 'Anything moldy inside goes straight in the trash. No guilt.' },
  { id: 'b-tp-zone',        zone: 'bath', mins: 10, title: 'The extra toilet paper zone',       done: 'Contained in one basket or bin instead of stacked in a corner.' },

  /* ---------- Bedroom ---------- */
  { id: 'd-nightstand-dr',  zone: 'bedroom', mins: 15, title: 'The nightstand drawer',          done: 'Empty it onto the bed. Old chargers, cough drops, and receipts do not go back.' },
  { id: 'd-nightstand-top', zone: 'bedroom', mins: 10, title: 'The top of the nightstand',      done: 'Down to a lamp, a book, and one other thing. Dust underneath.' },
  { id: 'd-socks',          zone: 'bedroom', mins: 15, title: 'The sock drawer',                done: 'Singles, thin heels, and stretched-out elastic go. Everything matched.' },
  { id: 'd-underwear',      zone: 'bedroom', mins: 15, title: 'The underwear drawer',           done: 'If you would be embarrassed in the emergency room, it goes.' },
  { id: 'd-tshirts',        zone: 'bedroom', mins: 20, title: 'The t-shirt drawer',             done: 'Stained, pilled, and never-worn are out. Fold the rest so you can see them.' },
  { id: 'd-jewelry',        zone: 'bedroom', mins: 20, title: 'The jewelry dish or box',        done: 'Untangled, broken pieces set aside to fix or let go, singles from lost pairs gone.' },
  { id: 'd-under-bed',      zone: 'bedroom', mins: 20, title: 'Under the bed — one side',       done: 'One side only. Pull it all out, sweep, put back only what belongs there.' },
  { id: 'd-the-chair',      zone: 'bedroom', mins: 15, title: 'The chair where clothes live',   done: 'Every item hung, folded, or in the hamper. The chair is a chair again.' },
  { id: 'd-purse',          zone: 'bedroom', mins: 10, title: 'The bag you carry every day',    done: 'Dumped out, receipts tossed, crumbs shaken out, only essentials back in.' },
  { id: 'd-dresser-top',    zone: 'bedroom', mins: 10, title: 'The top of the dresser',         done: 'Cleared, dusted, and only a few things come back up.' },
  { id: 'd-hangers',        zone: 'bedroom', mins: 10, title: 'The hangers',                    done: 'Empty ones collected in one spot, wire ones out of the house.' },
  { id: 'd-sweaters',       zone: 'bedroom', mins: 20, title: 'The sweater shelf',              done: 'Pilled and itchy ones go. The stack should not topple.' },
  { id: 'd-workout',        zone: 'bedroom', mins: 15, title: 'Workout clothes',                done: 'Keep what you wear. Stretched waistbands and scratchy tags go.' },
  { id: 'd-pajamas',        zone: 'bedroom', mins: 10, title: 'The pajama drawer',              done: 'Keep what you actually sleep in. The rest become rags or donations.' },
  { id: 'd-belts-scarves',  zone: 'bedroom', mins: 15, title: 'Belts and scarves',              done: 'Hung or rolled in one place instead of draped over three.' },
  { id: 'd-bedroom-shoes',  zone: 'bedroom', mins: 10, title: 'The shoes by the bed',           done: 'Back to the closet, or in the donate box if you have not worn them this year.' },

  /* ---------- Closets ---------- */
  { id: 'c-coat-shelf',     zone: 'closet', mins: 15, title: 'The coat closet shelf',           done: 'One shelf, emptied and reset. Mystery boxes get opened and dealt with.' },
  { id: 'c-coats',          zone: 'closet', mins: 20, title: 'The hanging coats',               done: 'Broken zippers fixed or gone, wrong sizes donated, one hanger per coat.' },
  { id: 'c-sheets',         zone: 'closet', mins: 20, title: 'The sheets in the linen closet',  done: 'Sets matched, orphan fitted sheets gone. Keep two sets per bed.' },
  { id: 'c-closet-floor',   zone: 'closet', mins: 15, title: 'The hall closet floor',           done: 'Everything off the floor. Vacuum it. Only what belongs comes back.' },
  { id: 'c-shoe-rack',      zone: 'closet', mins: 20, title: 'The shoe rack',                   done: 'Worn out, hurts to wear, or never worn — all three go.' },
  { id: 'c-donate-run',     zone: 'closet', mins: 10, title: 'Take the donate bag to the car',  done: 'It is in the trunk. That is the whole task. It counts.' },
  { id: 'c-giftwrap',       zone: 'closet', mins: 15, title: 'Gift wrap and bags',              done: 'Torn paper tossed, bags flattened and stacked, ribbon in one bag.' },
  { id: 'c-games',          zone: 'closet', mins: 20, title: 'The board game shelf',            done: 'Open the boxes. Missing pieces means it goes. Tape the tired corners.' },
  { id: 'c-luggage',        zone: 'closet', mins: 15, title: 'The suitcases',                   done: 'Every one opened and emptied. Nested back together if they fit.' },
  { id: 'c-high-shelf',     zone: 'closet', mins: 20, title: 'The shelf above the clothes rod', done: 'Get a step stool. Everything down, sorted, and only keepers go back up.' },
  { id: 'c-bags-backpacks', zone: 'closet', mins: 15, title: 'Handbags and backpacks',          done: 'Each one emptied and checked. You will find money. Broken ones go.' },
  { id: 'c-dry-cleaning',   zone: 'closet', mins: 10, title: 'Dry cleaning bags and tags',      done: 'Plastic off everything, old tags pulled, bags recycled.' },

  /* ---------- Living / common ---------- */
  { id: 'l-coffee-table',   zone: 'living', mins: 10, title: 'The coffee table',                done: 'Cleared to the surface, wiped, and three things come back at most.' },
  { id: 'l-tv-drawer',      zone: 'living', mins: 15, title: 'The TV console drawer',           done: 'Cables to devices you no longer own go in the e-waste bag.' },
  { id: 'l-remotes',        zone: 'living', mins: 10, title: 'Remotes and batteries',           done: 'Dead batteries collected for recycling, remotes for gone devices tossed.' },
  { id: 'l-cords',          zone: 'living', mins: 20, title: 'The basket of cords',             done: 'If you cannot name what it charges in five seconds, it goes.' },
  { id: 'l-bookshelf',      zone: 'living', mins: 20, title: 'One bookshelf shelf',             done: 'One shelf. Dust it, and pull anything you will not read again.' },
  { id: 'l-blankets',       zone: 'living', mins: 10, title: 'The blanket basket',              done: 'Folded, the scratchy ones donated, and it closes or stacks neatly.' },
  { id: 'l-one-toy-bin',    zone: 'living', mins: 15, title: 'One toy bin',                     done: 'Just one. Broken toys out, pieces reunited, lid goes on.' },
  { id: 'l-candles',        zone: 'living', mins: 10, title: 'Candles and matches',             done: 'Burned-out jars recycled, all matches and lighters in one safe spot.' },
  { id: 'l-catchall',       zone: 'living', mins: 10, title: 'The catch-all bowl',              done: 'Empty. Every item put where it actually belongs.' },
  { id: 'l-media',          zone: 'living', mins: 15, title: 'DVDs and video games',            done: 'Discs matched to cases. Anything you stream instead can go.' },
  { id: 'l-plants',         zone: 'living', mins: 15, title: 'The houseplants',                 done: 'Dead leaves pulled, saucers emptied, and the truly dead ones composted.' },
  { id: 'l-under-couch',    zone: 'living', mins: 15, title: 'Under and behind the couch',      done: 'Cushions off, crevices cleared, floor vacuumed underneath.' },
  { id: 'l-side-table',     zone: 'living', mins: 10, title: 'The side table drawer',           done: 'Emptied, wiped, and refilled with only what you use in that room.' },
  { id: 'l-frames',         zone: 'living', mins: 15, title: 'The photos and frames',           done: 'Dusted, glass wiped, and any frame still holding the stock photo gets filled or donated.' },
  { id: 'l-tired-decor',    zone: 'living', mins: 10, title: 'Decor you are tired of',          done: 'Walk one room and pull five things you no longer love. Box them.' },
  { id: 'l-windowsill',     zone: 'living', mins: 10, title: 'One windowsill',                  done: 'Cleared, wiped, and the dead flies dealt with. Yes, really.' },

  /* ---------- Entry ---------- */
  { id: 'e-entry-table',    zone: 'entry', mins: 10, title: 'The entry table',                  done: 'Clear surface. Whatever piled up there gets returned to its home.' },
  { id: 'e-shoe-pile',      zone: 'entry', mins: 15, title: 'The shoe pile by the door',        done: 'Two pairs per person stay. The rest go back to closets.' },
  { id: 'e-keys',           zone: 'entry', mins: 10, title: 'Keys and key hooks',               done: 'Every key identified. The ones that open nothing go in the trash.' },
  { id: 'e-mail-spot',      zone: 'entry', mins: 15, title: 'The mail landing spot',            done: 'Sorted into shred, act on, and recycle. The recycle pile leaves the house.' },
  { id: 'e-umbrellas',      zone: 'entry', mins: 10, title: 'Umbrellas and rain gear',          done: 'Broken umbrellas tossed. The rest in one stand or hook.' },
  { id: 'e-pet-station',    zone: 'entry', mins: 15, title: 'The pet gear station',             done: 'Leashes hung, old bags tossed, treats sealed, one spot for all of it.' },
  { id: 'e-hats-gloves',    zone: 'entry', mins: 15, title: 'The hat and glove bin',            done: 'Single gloves given one last chance to find a partner, then out.' },
  { id: 'e-bench',          zone: 'entry', mins: 15, title: 'The entry bench or cubbies',       done: 'Each cubby emptied and reset. You can sit on the bench again.' },
  { id: 'e-returns',        zone: 'entry', mins: 15, title: 'The package return pile',          done: 'Labels printed and boxes taped, sitting by the door ready to go.' },
  { id: 'e-masks',          zone: 'entry', mins: 10, title: 'Leftover sanitizer and masks',     done: 'Keep a small stash. The dried-out bottles and stretched masks go.' },

  /* ---------- Laundry ---------- */
  { id: 'w-detergent',      zone: 'laundry', mins: 10, title: 'The detergent shelf',            done: 'Drips wiped, near-empty bottles combined, the one that gave you a rash gone.' },
  { id: 'w-dryer-zone',     zone: 'laundry', mins: 10, title: 'The lint and dryer sheet zone',  done: 'Lint trap deep cleaned, sheets in a container, surface wiped.' },
  { id: 'w-single-socks',   zone: 'laundry', mins: 15, title: 'The single sock bin',            done: 'Matched what you can. Anything unmatched for months gets thrown out today.' },
  { id: 'w-floor',          zone: 'laundry', mins: 15, title: 'The laundry room floor',         done: 'Everything off the floor, swept, and behind the machines checked.' },
  { id: 'w-mending',        zone: 'laundry', mins: 15, title: 'The mending pile',               done: 'Each item gets a decision: fix it this week, or donate it today.' },
  { id: 'w-rags',           zone: 'laundry', mins: 10, title: 'The cleaning rags',              done: 'Washed, folded, and capped at what fits in one bin.' },
  { id: 'w-iron',           zone: 'laundry', mins: 10, title: 'The iron and ironing supplies',  done: 'Cord wrapped, board stored properly, starch that is crusted shut tossed.' },
  { id: 'w-stain',          zone: 'laundry', mins: 10, title: 'Stain treatment products',       done: 'One that works stays within reach. The rest go.' },
  { id: 'w-baskets',        zone: 'laundry', mins: 10, title: 'The laundry baskets themselves', done: 'Cracked ones out, and every basket is empty for once.' },
  { id: 'w-hangers-laundry',zone: 'laundry', mins: 10, title: 'The laundry room hangers',       done: 'Collected, counted, and the extras moved to the closet or recycled.' },

  /* ---------- Paper / office ---------- */
  { id: 'p-mail-pile',      zone: 'paper', mins: 20, title: 'The mail pile',                    done: 'Three piles: shred, act on, recycle. Two of them leave the house today.' },
  { id: 'p-pens',           zone: 'paper', mins: 10, title: 'The pens',                         done: 'Test every one on scrap paper. Dead ones in the trash. It is very satisfying.' },
  { id: 'p-desk-drawer',    zone: 'paper', mins: 15, title: 'The top desk drawer',              done: 'Emptied, wiped, and refilled with only what you reach for weekly.' },
  { id: 'p-manuals',        zone: 'paper', mins: 15, title: 'Manuals and warranties',           done: 'Manuals for things you no longer own go. The rest is all in one folder.' },
  { id: 'p-receipts',       zone: 'paper', mins: 15, title: 'The receipt pile',                 done: 'Keep only what is under warranty or needed for taxes. Shred the rest.' },
  { id: 'p-school-papers',  zone: 'paper', mins: 20, title: 'The school paper pile',            done: 'Photograph the sweet ones, keep three, recycle the rest.' },
  { id: 'p-one-folder',     zone: 'paper', mins: 15, title: 'One file folder',                  done: 'Pick the fattest one. Purge anything older than seven years.' },
  { id: 'p-business-cards', zone: 'paper', mins: 10, title: 'The business cards',               done: 'Type the five you need into your phone. Recycle all of them.' },
  { id: 'p-notebooks',      zone: 'paper', mins: 15, title: 'The notebooks',                    done: 'Used pages torn out and recycled. Half-empty notebooks become scrap pads.' },
  { id: 'p-desk-surface',   zone: 'paper', mins: 15, title: 'The desk surface',                 done: 'Cleared to bare wood, wiped, and only the daily things come back.' },
  { id: 'p-cable-drawer',   zone: 'paper', mins: 20, title: 'The cable and charger drawer',     done: 'Each cable tested or identified. Unknowns go in the e-waste bag.' },
  { id: 'p-ewaste',         zone: 'paper', mins: 15, title: 'Start an e-waste bag',             done: 'One bag with old phones, dead cables, and busted electronics. Put it by the door.' },
  { id: 'p-shredding',      zone: 'paper', mins: 20, title: 'The shredding pile',              done: 'Actually run it through the shredder. Empty the bin when you are done.' },
  { id: 'p-cards',          zone: 'paper', mins: 15, title: 'Greeting cards and stationery',    done: 'Keep the handwritten ones that mean something. Recycle the rest.' },
  { id: 'p-tax-year',       zone: 'paper', mins: 20, title: 'One year of tax documents',        done: 'One year, filed together and labeled, or shredded if it is past seven years.' },
  { id: 'p-supplies',       zone: 'paper', mins: 15, title: 'Office supply overflow',           done: 'Sticky notes, paper clips, and tape consolidated into one drawer.' },

  /* ---------- Digital ---------- */
  { id: 'g-home-screen',    zone: 'digital', mins: 15, title: 'Your phone home screen',         done: 'One screen. Everything else in the app drawer or a folder.' },
  { id: 'g-screenshots',    zone: 'digital', mins: 15, title: 'Delete 50 screenshots',          done: 'Fifty. Sort by screenshots, select, delete, then empty recently deleted.' },
  { id: 'g-downloads',      zone: 'digital', mins: 15, title: 'The Downloads folder',           done: 'Empty, or close to it. Anything you needed you already used.' },
  { id: 'g-desktop',        zone: 'digital', mins: 15, title: 'The computer desktop',           done: 'Under ten icons. Make a folder called Sort Later if you must.' },
  { id: 'g-unsubscribe',    zone: 'digital', mins: 15, title: 'Unsubscribe from 10 lists',      done: 'Ten. Search your inbox for "unsubscribe" and work down the list.' },
  { id: 'g-apps',           zone: 'digital', mins: 10, title: 'Delete 5 phone apps',            done: 'Five you have not opened in six months. Check your screen time list.' },
  { id: 'g-contacts',       zone: 'digital', mins: 15, title: 'The contacts list',              done: 'Duplicates merged, and people you cannot place at all deleted.' },
  { id: 'g-notes',          zone: 'digital', mins: 15, title: 'The notes app',                  done: 'Act on the ones that are tasks, delete the ones that are noise.' },
  { id: 'g-bookmarks',      zone: 'digital', mins: 15, title: 'The bookmarks bar',              done: 'Dead links gone, the rest in folders, under ten visible.' },
  { id: 'g-watchlist',      zone: 'digital', mins: 10, title: 'The streaming watchlists',       done: 'Remove anything you have been ignoring for a year. You are not going to watch it.' },
  { id: 'g-voicemail',      zone: 'digital', mins: 10, title: 'Voicemails',                     done: 'Saved ones you care about backed up, the rest deleted.' },
  { id: 'g-texts',          zone: 'digital', mins: 10, title: 'Old text threads',               done: 'Delivery confirmations and one-time codes cleared out.' },
  { id: 'g-recipes',        zone: 'digital', mins: 15, title: 'Saved recipes',                  done: 'Pick three to actually cook this month. Delete twenty you never will.' },
  { id: 'g-cloud-folder',   zone: 'digital', mins: 20, title: 'One cloud storage folder',       done: 'Pick one. Duplicates deleted, everything else named properly.' },

  /* ---------- Car ---------- */
  { id: 'v-glovebox',       zone: 'car', mins: 10, title: 'The glovebox',                       done: 'Registration and insurance current and on top. Old napkins and receipts gone.' },
  { id: 'v-console',        zone: 'car', mins: 10, title: 'The center console',                 done: 'Emptied, wiped, sticky spots cleaned. Change collected in one spot.' },
  { id: 'v-door-pockets',   zone: 'car', mins: 10, title: 'The car door pockets',               done: 'Every one emptied. You will find at least one thing you were looking for.' },
  { id: 'v-trunk',          zone: 'car', mins: 20, title: 'The trunk',                          done: 'Emptied, vacuumed if you can, and only the emergency kit goes back.' },
  { id: 'v-backseat',       zone: 'car', mins: 15, title: 'The back seat floor',                done: 'Trash bagged, toys returned to the house, floor mats shaken out.' },
  { id: 'v-car-trash',      zone: 'car', mins: 10, title: 'Car trash sweep',                    done: 'One bag, every surface. Add a small trash container while you are at it.' },
  { id: 'v-emergency-kit',  zone: 'car', mins: 15, title: 'The car emergency kit',              done: 'Jumper cables, flashlight with working batteries, water, blanket. Checked.' },
  { id: 'v-cupholders',     zone: 'car', mins: 10, title: 'The cup holders',                    done: 'Liners out, washed, and the archaeological layer at the bottom gone.' },

  /* ---------- Garage / storage ---------- */
  { id: 's-tool-drawer',    zone: 'storage', mins: 20, title: 'The tool drawer',                done: 'Tools back in their spots, duplicates consolidated, broken ones tossed.' },
  { id: 's-hardware',       zone: 'storage', mins: 20, title: 'The screws and hardware jars',   done: 'Sorted roughly by type into labeled jars or a divided box.' },
  { id: 's-batteries',      zone: 'storage', mins: 10, title: 'The battery stash',              done: 'Tested if you have a tester, sorted by size, dead ones bagged for recycling.' },
  { id: 's-lightbulbs',     zone: 'storage', mins: 10, title: 'The lightbulbs',                 done: 'Wrong-size and burnt-out bulbs gone. One labeled box for the rest.' },
  { id: 's-paint',          zone: 'storage', mins: 20, title: 'The paint cans',                 done: 'Dried-out ones set aside for disposal. Lids labeled with the room.' },
  { id: 's-ext-cords',      zone: 'storage', mins: 15, title: 'The extension cords',            done: 'Wrapped and secured, frayed ones cut and thrown out.' },
  { id: 's-garden',         zone: 'storage', mins: 20, title: 'The garden tools',               done: 'Dirt knocked off, hung or stood in one place, broken handles dealt with.' },
  { id: 's-one-shelf',      zone: 'storage', mins: 20, title: 'One storage shelf',              done: 'One shelf only. Emptied, wiped, and half of it does not go back up.' },
  { id: 's-boxes',          zone: 'storage', mins: 15, title: 'The cardboard box pile',         done: 'Broken down flat and out to recycling. Keep two for shipping.' },
  { id: 's-sports',         zone: 'storage', mins: 20, title: 'The sports equipment',           done: 'Outgrown gear donated, balls inflated, everything in one zone.' },
  { id: 's-holiday-bin',    zone: 'storage', mins: 20, title: 'One holiday decor bin',          done: 'Broken ornaments and tangled lights that do not work are out. Relabel the bin.' },
  { id: 's-misc-bin',       zone: 'storage', mins: 20, title: 'The bin nobody ever opens',      done: 'Open it. Anything you did not miss in a year goes.' },
  { id: 's-bikes',          zone: 'storage', mins: 15, title: 'Bikes and helmets',              done: 'Tires pumped, outgrown bikes and cracked helmets out. Helmets expire.' },
  { id: 's-outdoor',        zone: 'storage', mins: 20, title: 'Outdoor cushions and furniture', done: 'Wiped down, moldy ones tossed, stored where they will stay dry.' },

  /* ---------- Kids ---------- */
  { id: 'y-stuffies',       zone: 'kids', mins: 15, title: 'The stuffed animals',               done: 'Let them pick five favorites to keep on the bed. Box the rest out of sight for a month.' },
  { id: 'y-art-supplies',   zone: 'kids', mins: 20, title: 'The art supplies',                  done: 'Dried markers tested and tossed, crayon stubs combined, caps back on.' },
  { id: 'y-books',          zone: 'kids', mins: 15, title: 'One shelf of kids books',           done: 'Outgrown board books boxed for donation, torn ones recycled.' },
  { id: 'y-small-parts',    zone: 'kids', mins: 15, title: 'The bin of tiny toy parts',         done: 'Reunite what you can with its set. The rest goes without ceremony.' },
  { id: 'y-outgrown',       zone: 'kids', mins: 20, title: 'Outgrown kids clothes',             done: 'One drawer or one size. Bagged and labeled for hand-me-down or donation.' },
  { id: 'y-kid-shoes',      zone: 'kids', mins: 10, title: 'The kids shoes',                    done: 'Try them on. Too small goes out today, not into a someday pile.' },
  { id: 'y-craft-kits',     zone: 'kids', mins: 15, title: 'Craft and activity kits',           done: 'Incomplete kits tossed, the good ones stacked where they can reach them.' },
  { id: 'y-backpack',       zone: 'kids', mins: 10, title: 'The backpack',                      done: 'Fully emptied, crumbs shaken out, papers dealt with, and repacked.' },
  { id: 'y-lunch-gear',     zone: 'kids', mins: 10, title: 'Kids water bottles and lunch gear', done: 'Every lid matched, anything smelly deep cleaned or replaced.' },
  { id: 'y-puzzles',        zone: 'kids', mins: 20, title: 'The puzzles',                       done: 'Count the pieces on one puzzle. Incomplete means it goes.' },

  /* ---------- Anywhere ---------- */
  { id: 'a-one-surface',    zone: 'anywhere', mins: 15, title: 'Clear one flat surface',        done: 'Pick the worst one in the house. Completely clear, then wiped.' },
  { id: 'a-later-pile',     zone: 'anywhere', mins: 20, title: 'The "I will deal with it later" pile', done: 'Later is today. Every item gets a decision, not a new pile.' },
  { id: 'a-ten-things',     zone: 'anywhere', mins: 15, title: 'Find 10 things to donate',      done: 'Ten items, anywhere in the house, in a box by the door.' },
  { id: 'a-expired-food',   zone: 'anywhere', mins: 15, title: 'Expired food sweep',            done: 'One shelf or cabinet. Check every date. No mercy.' },
  { id: 'a-vases',          zone: 'anywhere', mins: 10, title: 'Vases and gift bags',           done: 'Keep three vases and a stack of bags. The rest get donated.' },
  { id: 'a-phone-cases',    zone: 'anywhere', mins: 10, title: 'Phone cases and accessories',   done: 'Cases for phones you no longer own go. Obviously.' },
  { id: 'a-sunglasses',     zone: 'anywhere', mins: 10, title: 'The sunglasses',                done: 'Scratched and broken ones out. Keep the pairs you actually wear.' },
  { id: 'a-mystery-cord',   zone: 'anywhere', mins: 10, title: 'The cord you cannot identify',  done: 'Trace it or toss it. Do not put it back in the drawer.' },
  { id: 'a-pet-toys',       zone: 'anywhere', mins: 10, title: 'The pet toys',                  done: 'Shredded and unstuffed ones tossed, the rest in one basket.' },
  { id: 'a-wallet',         zone: 'anywhere', mins: 10, title: 'Your wallet',                   done: 'Emptied, expired cards cut up, receipts out, and it closes properly again.' },
  { id: 'a-avoided-drawer', zone: 'anywhere', mins: 20, title: 'The drawer you have been avoiding', done: 'You know exactly which one. Empty it onto a towel and start.' },
  { id: 'a-fridge-top',     zone: 'anywhere', mins: 10, title: 'The top of the refrigerator',   done: 'Everything down, the dust and grease wiped off, very little goes back.' },
  { id: 'a-junk-drawer-2',  zone: 'anywhere', mins: 15, title: 'The other junk drawer',         done: 'Every house has at least two. This is the second one.' },
  { id: 'a-photograph',     zone: 'anywhere', mins: 15, title: 'Photograph the sentimental stuff', done: 'Pick five keepsakes you are keeping out of guilt. Photograph them, then let them go.' },
  { id: 'a-return-borrowed',zone: 'anywhere', mins: 15, title: 'Things that belong to other people', done: 'Gathered in one bag, with a text sent to arrange getting them back.' },
  { id: 'a-junk-mail-stop', zone: 'anywhere', mins: 15, title: 'Stop the junk mail at the source', done: 'Opt out of at least three catalogs or mailers that keep coming.' }
];

/* ============================================================
   Decision prompts
   ------------------------------------------------------------
   One of these shows under each day's task, rotating daily.

   These are for the moment mid-drawer where you're holding
   something you don't use and don't want, and still can't put
   it in the bag. The task tells you what to do; this tells you
   how to decide. Keep them short — it's one line on a phone.
   ============================================================ */

const PROMPTS = [
  'If you needed this tomorrow, would you look for it here — or would you have forgotten you owned it?',
  'Would you buy it again today, at full price?',
  'The guilt is about money you already spent. Letting it go doesn\'t spend it twice.',
  'Keeping it just in case? Name the case out loud.',
  'If it\'s been broken for a year, this isn\'t the year you fix it.',
  'Would you pack this if you moved next month?',
  'Are you storing it, or just moving it from one spot to another?',
  'Sentimental? Photograph it. The memory isn\'t in the object.',
  'If it\'s a duplicate, which one do you actually reach for?',
  'Does this fit the life you have now, or one you had five years ago?',
  'Expired is a decision someone already made for you.',
  'It didn\'t work out. That\'s information, not a debt.',
  'Is this the one you\'d keep if you could only keep one?',
  'Does someone else need this more than your shelf does?',
  'You are allowed to get rid of a gift. You kept it long enough.'
];
