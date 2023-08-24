---
layout: "../../layouts/Blog.astro"
poster: "https://source.unsplash.com/random?rust"
subtitle: "My Journey in Learning Rust"
title: "This Week in Rust"
---

## Table of Contents

- [<span style="color: red;">Deref Trait in Rust</span>](#defef-trait-in-rust)
- [<span style="color: red;">Building a Simple Web Server in Rust</span>](#building-a-simple-web-server-in-rust)

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
