---
layout: "../../layouts/Blog.astro"
poster: "https://source.unsplash.com/random?rust"
subtitle: "My Journey in Learning Rust"
title: "This Week in Rust"
---

## Table of Contents

[<span style="color: red;">Deref Trait in Rust</span>](#defef-trait-in-rust)

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
