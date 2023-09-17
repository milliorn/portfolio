---
layout: "../../layouts/Blog.astro"
poster: "https://source.unsplash.com/random?rust"
subtitle: "My Journey in Learning Rust"
title: "This Week in Rust"
---

## Table of Contents

- [<span style="color: red;">Deref Trait in Rust</span>](#defef-trait-in-rust)
- [<span style="color: red;">Building a Simple Web Server in Rust</span>](#building-a-simple-web-server-in-rust)
- [<span style="color: red;">Actions and Calculations</span>](#actions-and-calculations)

### Deref Trait in Rust

The **Deref trait** is a foundational concept in Rust, pivotal to smart pointers and reference handling. It empowers you to customize the behavior of the dereference operator (`*`), enabling seamless access to data beneath references and smart pointers.

#### What is Dereferencing?

_Dereferencing_ is the process of tracing a reference to access the data it points to. In Rust, the dereference operator (`*`), when applied to a reference or smart pointer, unlocks the underlying data.

#### Example 1: Dereferencing a Reference

```rust
    let x = 5; // An integer value
    let y = &x; // A reference to x

    let result_x = x == 5; // Comparison of x directly
    let result_y = *y == 5; // Dereferencing y to access x's value

    assert_eq!(result_x, true);
    assert_eq!(result_y, true);
```

In the second assertion, \*y dereferences the reference, enabling direct comparison with 5. Without dereferencing, direct comparison between a reference and an integer is impossible.

#### Example 2: Dereferencing a Smart Pointer

```rust
    use std::rc::Rc;

    let z = Rc::new(10); // Creating an Rc smart pointer
    let z_ref = &z; // A reference to the Rc

    let result_z: bool = *z_ref == 10.into(); // Dereferencing Rc reference to access its inner value

    assert_eq!(result_z, true);
```

Here, \*z_ref dereferences the Rc, enabling access to the encapsulated integer value.

#### Customizing Behavior with Deref Trait

You can implement the Deref trait to infuse custom dereferencing behavior into your types. This capability is particularly powerful for crafting your own smart pointers.

#### Example 3: Implementing Deref for a Smart Pointer

In this example, the MySmartPtr struct implements Deref, returning a reference to its encapsulated data. This empowers us to dereference the smart pointer for data access. Deref is implemented for both mutable and immutable references. DerefMut is used for mutable dereferencing and is implemented for mutable references.

```rust
    use std::ops::Deref;

    struct MySmartPtr<T> {
        data: T,
    }

    impl<T> Deref for MySmartPtr<T> {
        type Target = T;

        fn deref(&self) -> &Self::Target {
            &self.data
        }
    }

    let smart_ptr = MySmartPtr {
        data: "Hello, Deref!",
    };
    let dereferenced = *smart_ptr;

    assert_eq!(dereferenced, "Hello, Deref!");
```

This demonstration showcases that by implementing Deref, MySmartPtr behaves like a reference, enabling seamless data access.

The Deref trait stands as a cornerstone in Rust, bridging the gap between smart pointers, references, and data manipulation. Through its utilization, you gain finer control over data interactions, enhancing the safety and flexibility of your Rust programs.

### Building a Simple Web Server in Rust

Rust, known for its safety and performance, has been gaining popularity among developers for a wide range of applications. One fascinating aspect of Rust is its suitability for building web servers, thanks to its powerful standard library and expressive language features. In this blog post, we will embark on a journey into the world of Rust by creating a simple web server from scratch.

Our journey begins with the creation of the simplest form of a web server. We'll use nothing but Rust's standard networking types from the std::net module. Our goal is to accept HTTP requests and respond with a basic message. While we'll skip most of the HTTP specification details, we'll focus on understanding the fundamental flow of the server.

First, we need to create a project. We'll use **Cargo**, Rust's package manager, to create a new project. We'll call our project `simple-web-server`.

```bash
$ cargo new simple-web-server
```

This command creates a new project with the following structure:

```bash
simple-web-server
├── Cargo.toml
└── src
    └── main.rs
```

The `Cargo.toml` file is the manifest file for our project. It contains **metadata and dependencies** for the project. The `src` directory contains the source code for our project. The `main.rs` file is the entry point for our application. We'll use this file to write our server code. Let's open the `Cargo.toml` file and add the following dependencies:

HTTP, a text-based protocol built on top of TCP, necessitates the acceptance of TCP connections initially. This can be accomplished by creating a TcpListener as shown below:

```rust
use std::net::TcpListener;

fn main() {
    let listener = TcpListener::bind("localhost:3000").unwrap();
}
```

#### Handling Connections

A critical aspect of our web server is the ability to handle incoming connections. We'll use a loop to listen for and process connections one by one. When a connection is accepted, we'll call a function to handle it. Here's the main loop:

```rust
use std::net::{TcpListener, TcpStream};
use std::io;

fn main() {
    let listener = TcpListener::bind("localhost:3000").unwrap();

    loop {
        let (connection, _) = listener.accept().unwrap();

        if let Err(e) = handle_connection(connection) {
            println!("Failed to handle connection: {}", e);
        }
    }
}
```

The `accept()` method of `TcpListener` returns a `TcpStream` and an `std::net::SocketAddr` representing the remote peer's address. We'll ignore the address for now. The `TcpStream` implements the `Read` and `Write` traits, enabling us to read and write data to the connection. We'll use the **handle_connection()** function to handle the connection. We will implement this function in the next section.

#### Handling Requests

Our server handles connections using the **handle_connection** function. TCP connections are represented by the TcpStream type, which implements the Read and Write traits. These traits allow us to read and write bytes over the connection.

Here's an overview of how the handle_connection function works:

- We initialize a buffer to hold the incoming HTTP request.
- We read from the stream in a loop, keeping track of the number of bytes read.
- We check if we've reached the end of the request by looking for \r\n\r\n, which marks the end of the HTTP headers.
- Once we've read the entire request, we convert it to a string and log it to the console.

```rust
fn handle_connection(mut connection: TcpStream) -> io::Result<()> {
    let mut read = 0;
    let mut request = [0u8; 1024];

    loop {
        let num_bytes = connection.read(&mut request[read..])?;

        read += num_bytes;

        if request.get(read - 4..read) == Some(b"\r\n\r\n") {
            break;
        }
    }

    let request_str = String::from_utf8_lossy(&request[..read]);
    println!("{}", request_str);
    // ... more code
}
```

#### Sending Responses

After reading the request, our server sends a response. In this basic example, our response is a simple "Hello, World!" message. We construct the response using HTTP headers and the response body. The response headers are separated from the body by a blank line. The response headers contain information about the response, such as the content type and length. The response body contains the actual data.

```rust
let response = concat!(
    "HTTP/1.1 200 OK\r\n",
    "Content-Length: 13\r\n",
    "Connection: close\r\n\r\n",
    "Hello, World!"
);
```

We then write the response to the client in a loop, ensuring that we write the entire response.

```rust
let mut written = 0;

loop {
    let num_bytes = connection.write(response[written..].as_bytes())?;

    if num_bytes == 0 {
        println!("Client disconnected unexpectedly");
        return Ok(());
    }

    written += num_bytes;

    if written == response.len() {
        break;
    }
}
```

#### Putting It All Together

Here's the complete code for our simple web server:

```rust
use std::{
    io::{self, Read, Write},
    net::{TcpListener, TcpStream},
};

fn main() {
    // HTTP is a text-based protocol built on top of TCP,
    // so to start, we have to accept TCP connections.
    let listener = TcpListener::bind("localhost:3000").unwrap();

    // Listen for incoming connections, handling them one by one.
    loop {
        let (connection, _) = listener.accept().unwrap();

        if let Err(e) = handle_connection(connection) {
            println!("Failed to handle connection: {}", e);
        }
    }
}

// TCP connections are represented by the TcpStream type,
// a bidirectional stream of data between us and the client.
// It implements the Read and Write traits,
// abstracting away the internal details of TCP and allowing us to read or write plain old bytes.
fn handle_connection(mut connection: TcpStream) -> io::Result<()> {
    let mut read = 0;
    // As a server, we need to receive the HTTP request.
    // Initialize a buffer to hold the request.
    let mut request = [0u8; 1024];

    loop {
        // Try reading from the stream.
        let num_bytes = connection.read(&mut request[read..])?;

        // Keep track of how many bytes we've read.
        read += num_bytes;

        // Have we reached the end of the request?
        if request.get(read - 4..read) == Some(b"\r\n\r\n") {
            break;
        }
    }

    // Once we've read the entire request,
    // convert it to a string and log it to the console.
    let request_str = String::from_utf8_lossy(&request[..read]);
    println!("{}", request_str);

    // "Hello, World!" in HTTP
    let response = concat!(
        "HTTP/1.1 200 OK\r\n",
        "Content-Length: 13\r\n",
        "Connection: close\r\n\r\n",
        "Hello, World!"
    );

    let mut written = 0;

    // Just like read, a call to write may not write the entire buffer at once.
    // We need a second loop to ensure the entire response is written to the client,
    // with each call to write continuing from where the previous left off.
    loop {
        // Write the remaining response bytes.
        let num_bytes = connection.write(response[written..].as_bytes())?;

        // If the client disconnected, stop writing.
        if num_bytes == 0 {
            println!("Client disconnected unexpectedly");
            return Ok(());
        }

        written += num_bytes;

        // Have we written the whole response yet?
        if written == response.len() {
            break;
        }
    }

    // Call flush to ensure that the response is written to the client.
    let _ = connection.flush();

    Ok(())
}
```

#### Running the Server

We can run our server using the following command:

```bash
cargo run
```

This command compiles our code and runs the resulting binary. We can then open a browser and navigate to `http://localhost:3000` to see our server in action. We should see the following output in the browser:

```bash
Hello, World!
```

#### Conclusion

In this blog post, we built a simple web server in Rust. We started by creating a new project using Cargo. We then implemented the server using the standard networking types from the std::net module. We used a TcpListener to accept TCP connections and a TcpStream to read and write data over the connection. We then implemented a simple HTTP request parser and a response writer. Finally, we put it all together to create a simple web server. We can use this server as a starting point for more complex applications. We can also use it to learn more about Rust's standard library and language features. We've covered the basics of accepting TCP connections, handling incoming HTTP requests, and sending responses.

While our server is rudimentary, it provides valuable insights into the foundational concepts of Rust web development. As we progress in our Rust journey, we'll explore more advanced topics such as async/await, multithreading, and working with external libraries like Tokio.

Rust's robust standard library and powerful language features make it an excellent choice for web server development. Whether you're a seasoned Rustacean or just beginning your journey with the language, building a web server in Rust is an enlightening experience that showcases the language's elegance and capabilities. So, why not give it a try? Happy coding! 🦀

### Actions and Calculations

In this blog post, we'll explore a common pattern in Rust: separating actions and calculations. We'll start by looking at a simple example of this pattern in action. We'll then discuss the benefits of this pattern and how it can be applied to other areas of Rust development.

#### Calculations

Let's start with a simple example. Suppose we have a function that calculates the sum of two numbers:

```rust
fn sum(a: i32, b: i32) -> i32 {
    a + b
}
```

This function takes two numbers and returns their sum. It's a straightforward calculation that doesn't involve any side effects. We can call this function from anywhere in our code, and it will always return the same result for the same inputs. This function is a pure function.

#### Actions

Now, let's look at a function that prints the sum of two numbers:

```rust
fn print_sum(a: i32, b: i32) {
    println!("{}", a + b);
}
```

This function takes two numbers and prints their sum. It's an action that involves a side effect. We can call this function from anywhere in our code, and it will always print the same result for the same inputs. This function is an impure function.

#### Differences between Actions and Calculations

The key difference between actions and calculations is that actions involve side effects, while calculations do not. Side effects are changes to the state of the program that are not reflected in the return value of the function. For example, printing to the console is a side effect because it changes the state of the program but does not affect the return value of the function.

#### Isolate Pure Functions

In Rust, we can isolate pure functions from impure functions by using the `pure` keyword. This keyword tells the compiler that the function is pure and does not involve any side effects. The compiler will then enforce this by preventing us from calling the function from an impure context.

```rust
fn sum(arr: &[i32]) -> i32 {
    arr.iter().fold(0, |acc, &x| acc + x)
}

#[test]
fn test_sum() {
    assert_eq!(sum(&[1, 2, 3, 4]), 10);
}
```

#### Use Enums for Better Pattern Matching

In functional programming, pattern matching is often used for branching logic. In Rust, you can take advantage of enums to make this elegant.

```rust
enum Shape {
    Circle(f64),
    Square(f64),
}

// Calculation: Calculate area based on the shape
fn area(shape: &Shape) -> f64 {
    match shape {
        Shape::Circle(radius) => 3.14159 * radius * radius,
        Shape::Square(side) => side * side,
    }
}
```

#### Use Result Type for Error Handling

Actions, especially those involving IO, can fail. Use Rust's Result type to handle this gracefully.

```rust
use std::fs::File;
use std::io::prelude::*;

fn read_file(path: &str) -> Result<String, io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}
```

#### Use Option and Result in Function Signatures

Use Option and Result in function signatures to make it clear that the function may fail.

```rust
fn find_element(arr: &[i32], key: i32) -> Option<i32> {
    for &item in arr.iter() {
        if item == key {
            return Some(item);
        }
    }
    None
}
```

#### Separating Actions and Calculations

To follow functional programming principles more closely, you should aim to separate actions and calculations as much as possible.

```rust
fn calculate_tax(income: f64) -> f64 {
    income * 0.2
}

// Action
fn save_to_database(data: f64) -> Result<(), &'static str> {
    println!("Saving {} to database...", data); // Simulated action
    Ok(())
}

// High-Level Orchestration
fn process_income(income: f64) -> Result<(), &'static str> {
    let tax = calculate_tax(income); // Calculation
    save_to_database(tax) // Action
}
```

#### Conclusion

In this blog post, we've explored a common pattern in Rust: separating actions and calculations. We've seen how this pattern can be applied to a variety of situations, including error handling and branching logic. We've also seen how it can be used to make code more readable and maintainable. If you're interested in learning more about functional programming in Rust, check out the Rust Book. It's a great resource for learning the basics of Rust and functional programming in general.

Here is a snippet to see all the code in action:

```rust
use std::fs::File;
use std::io::Write;

fn main() {
    println!("Hello, world!");
    let x = 5;
    let y = 6;
    let z = add(x, y);
    println!("{} + {} = {}", x, y, z);

    let data = "Some data";
    write_to_file(data).expect("Failed to write to file");

    let arr = [1, 2, 3, 4];
    let total = sum(&arr);
    println!("Sum of {:?} is {}", arr, total);

    let circle = Shape::Circle(5.0);
    let square = Shape::Square(5.0);
    println!("Area of circle: {}", area(&circle));
    println!("Area of square: {}", area(&square));

    write_to_file_with_error("example.txt", "Some data").expect("Failed to write to file");

    let arr = [1, 2, 3, 4];
    let key = 3;
    match find_element(&arr, key) {
        Some(item) => println!("Found {} in {:?}", item, arr),
        None => println!("Could not find {} in {:?}", key, arr),
    }

    let income = 1000.0;
    process_income(income).expect("Failed to process income");

}

fn add(a: i32, b: i32) -> i32 {
    a + b // Purely based on the input, no side-effects
}

fn write_to_file(data: &str) -> std::io::Result<()> {
    let mut file = File::create("example.txt")?;
    file.write_all(data.as_bytes()) // Has a side-effect (writes to a file)
}

// Calculation: Pure function for summing an array
fn sum(arr: &[i32]) -> i32 {
    arr.iter().fold(0, |acc, &x| acc + x)
}

// You can easily test this
#[test]
fn test_sum() {
    assert_eq!(sum(&[1, 2, 3, 4]), 10);
}

enum Shape {
    Circle(f64),
    Square(f64),
}

// Calculation: Calculate area based on the shape
fn area(shape: &Shape) -> f64 {
    match shape {
        Shape::Circle(radius) => 3.14159 * radius * radius,
        Shape::Square(side) => side * side,
    }
}

// Action: Writes a string to a file
fn write_to_file_with_error(filename: &str, content: &str) -> std::io::Result<()> {
    let mut file = File::create(filename)?;
    file.write_all(content.as_bytes())
}

// Action: Trying to find an element in a list
fn find_element(arr: &[i32], key: i32) -> Option<i32> {
    for &item in arr.iter() {
        if item == key {
            return Some(item);
        }
    }
    None
}

// Calculation
fn calculate_tax(income: f64) -> f64 {
    income * 0.2
}

// Action
fn save_to_database(data: f64) -> Result<(), &'static str> {
    println!("Saving {} to database...", data); // Simulated action
    Ok(())
}

// High-Level Orchestration
fn process_income(income: f64) -> Result<(), &'static str> {
    let tax = calculate_tax(income); // Calculation
    save_to_database(tax) // Action
}
```
