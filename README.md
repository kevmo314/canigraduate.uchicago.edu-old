Can I Graduate?
===============

Hey! This readme is slightly outdated. Will get to updating it... eventually... PULL REQUESTS WELCOME.

Why didn't you use Django?
--------------------------

The bulk of the code is actually done in AngularJS. All the PHP code is just to interface with IT Services. If they provided the proper API's, there would be very little server-side code, so the PHP stuff is more just a temporary bridge until normal things that should happen, happen, at which point the terribly written PHP stuff will be removed and all things will be okay.

Purpose
-------

The original goal was to create an app that would tell you how far you were from acquiring another major. For example, if you were an econ major, you might be only a few classes away from a stats major, so instead of taking more electives you might choose to get a double major instead.

Over time, the app grew and now includes historical class data as well as grade distribution data for observing how difficult getting that second major would really be.

Contributing
------------

The data maintained for class dependency resolution is produced manually. This information cannot be scraped from the course catalog (trust me, I tried), but a side effect is that some dependency structures were too complicated to be written in the dependency tree structure. As a result, some were left out for future work. Pull requests must follow the guidelines below (but don't worry if they don't match exactly, I can fix minor issues).

If you wish to contribute a major, please see `requirements.js`. The file begins with a couple common sequences and predefined lists, but the main requirements variable provides each major's requirements. Each major starts as a requirement and the object can have the properties `classes`, `require`, and `notes`.

- `require` is the number of classes (requirement nodes or individual classes) that are required for this node to be considered complete. The root node has a default require of all classes.
- `classes` is an array of either requirement nodes or strings. A string represents that a single class is required. A requirement node indicates a group of classes that will fulfill one group towards the `require` count. Crosslistings are automatically taken care of, so it is only necessary to list one of the crosslisted courses.
- `notes` is a string of human-readable notes to indicate complications and difficulties that were not easy to represent in the dependency structure.
- `noCore` is a boolean if truthy will not permit core classes to populate this branch of the dependency tree.
- `hidden` is a boolean if truthy will default to not showing the tree. This improves rendering performance, so is preferable for large trees.
- `max` is a number indicating the maximum number of classes that can go towards fulfilling this branch. This is useful in scenarios where overflow is desired. See the requirements for Computer Science.
- `duplicates` is a boolean if truthy will permit previously used classes to fulfill this branch. See the requirements for Biological Sciences.
- `evaluate` is a `function(taken)` that is evaluated to prematurely reject a class if a non `true` value is returned. A string is commonly returned as an error message and behaves as one in place of `false`. `taken` is a sorted list of classes the student has taken. This is most commonly used in sequence enforcement.

The `classes` strings are matched with prefix searching. That is, `'HUMA 1'` matches any class with the string `HUMA 1xxxx`. Similarly, `'HUMA '` matches any humanities class. Note the space after the department, while not required, is there for aesthetic purposes and clarity, as `'HUMA'` evaluates to `HUMAxxxxxx`. Additionally, the space reduces potential complications in the future.

Dependency resolution is done such that once a class fulfills a requirement, it cannot fulfill future requirements. Thus, it is important to list the most specific classes first. That is, `'ECON 2'`, representing an econ elective, should be listed after `'ECON 20000'` to ensure that the `'ECON 20000'` class does not fulfill the `'ECON 2'` requirement, thus failing to fulfill the exact match.

Requirements are listed alphabetically, with the exception of the college core, which is handled as a special case.

### Minors and Specializations

Minors are designated by the word "Minor" suffixing the minor title. This will automatically be removed during postprocessing.

Specializations are designated by a colon delimiting the parent and specialization title. Specializations are treated as separate degrees and such, should contain only the additional requirements toward the specialization if possible. If this is not possible, it is preferable to split the specialization into a separate major.

Data Importing
--------------

Data importing is done by requesting the CNetID and password from the user, through which `superimport.php` (named because `import.php` wasn't good enough but was still kept for reference/backup) makes the appropriate requests to Shibboleth and masquerades as the user on http://my.uchicago.edu/. The academic history page is scraped to identify the class, term, and grade received.

The class data retrieved from the import is stored firstly fed back to the user for use in the application, but the term and grade received is stored in a database for statistical analysis. In the interest of privacy, association to the originating student is not maintained. Instead, the distribution consists of two tables: one that stores the class (ex ECON 20100) and the counts of A's, A-'s, B+'s, and so on,and another that stores the term (ex Winter 2011) and the counts of the grades.

These distributions are not kept in the same table in the interest of privacy, as some classes per quarter are small enough that it may be possible to identify the student that provided the data. Thus, keeping the two databases disjoint ensures that this is not possible.

In order to ensure that the distributions do not record the same data twice, the application checks that the user has not submitted the data before. This is done by the student-class association. A hash `sha1(student_id + class)` is calculated (x1000 rounds) and this is used to check whether or not the student's data has been added to the respective distributions. Note that this data does not provide grade information, so the association to the grades is still lost.

Automated Scraping
------------------

A cronjob runs every 15 minutes which scrapes timeschedules.uchicago.edu for enrollment changes and new class titles. The scraping files can be found in the `scripts` directory. It is self contained, with `main()` located in `get_schedules.py`. Some rudimentary filtering is also done to normalize the class titles.

Gotchas
-------

The term `signature` and `id` are both used to refer to the complete class identifier, eg `MATH 16200`. I wasn't consistent between the two, SORRY.

Technologies
------------

The database backend uses SQLite3 for simplicity.

PHP scripts are used to retrieve data and scrape UChicago web pages.

AngularJS is used for the majority of user interaction.

