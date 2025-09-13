import React from "react";

const JS_this_bind_arrow = () => {
  return (
    <div>
      <h1>Home work</h1>
      <p>
        qestion 1: What is `this` in strict mode inside a regular function
        invoked directly (`fn()`) in the browser? And what about outside strict
        mode?
      </p>
      <p>
        answer 1: *this in strict mode* after invoke the function will give you
        undefind, its beacause useing strict mode. the the goal is to prevent
        common bug's . *this outside strict mode* after invoke the function will
        gives you the window object
      </p>
      <p>
        <br />
        qeustion 2:What is the core difference between `this` in a regular
        function versus `this` in an arrow function?
      </p>
      <p>
        answer 2: In arrow function `this` refers to outer scope so it gives us
        undefind in strict mode or window if we are not in strict mode. In
        reguler function `this` refers to the object that the function belong
        to.
      </p>
      <br />
      <p>
        qeustion 3: What do `call`, `apply`, and `bind` do — and how do they
        differ from each other?
      </p>
      <p>
        answer 3: Manually set the this value when invoking a function.But they
        differ in how and when the function is called and how arguments are
        passed. apply() and call() invoke the function immediately vs bind()
        that returns new function when you invoke her.
      </p>
      <br />
      <p>qeustion 4: Why doesn’t `bind` affect an arrow function?</p>
      <p>
        answer 4: Because arrow functions don't have their own this, so there's
        nothing for bind to change.
      </p>
      <br />
      <p>
        qeustion 5: Can an arrow function be used as a constructor with `new`?
        Why or why not?
      </p>
      <p>
        answer 5: No, arrow function cant be used a constructor, arrow function
        donw own
      </p>
      <br />
      <p>
        qeustion 6: How is `this` determined when passing an object method as a
        callback?
      </p>
      <p>
        answer 6: this determined by how the function called, not where its
        defined, so if we use a callback `this` refer to window or gives us
        undifind (strict mode)
      </p>
      <br />
      <p>
        question 7: Contrast `this` in a DOM event listener defined with a
        regular function vs. with an arrow function.
      </p>
      <p>
        answer 7: `this` in DOM event listner in reguler function refers to the
        element. in arrow function `this` refers to undefind.
      </p>
      <br />
      <p>
        question 8: How does `this` behave inside `setTimeout`/`setInterval`
        callbacks?
      </p>
      <p>
        answer 8: `this` inside those callbacks gives us undefind because `this`
        refers to the window
      </p>
      <br />
      <p>
        qeustion 9: In a `class`, how does `this` differ between a regular
        method and a class field defined as an arrow function (e.g., `handle =
        () = {}`)?
      </p>
      <p>answer 9: I had a hard time understanding this question.</p>
      <br />
      <p>
        qeustion 10:What is `this` at the top level of an ES module
        (`type="module"`) vs. a classic script?
      </p>
      <p>
        answer 10: in a clasic stricpt `this` refers to windoe, in ES type
        module `this` refers to undefind becuase ES type module is in strict
        mode
      </p>
      <br />
      <p>answer 11: will print undefind because use strict</p>
      <br />
      <p>
        answer 12: will print undefind because im useing g=obj.getX so `this`
        refers to window
      </p>
      <br />
      <p>
        answer 13: will print 42, becuase we using .bind(obj), so the `this`
        refers to obj.
      </p>
      <br />
      <p>answer 14: will print 1</p>
      <br />
      <p>
        answer 15:it will print 'in timeout' undefind, this is inside
        setTimesout so `this` refers to thw window
      </p>
      <br />
      <p>
        answer 16: it will print arrow timeout 2 becuase we are using arrow
        function, arrow function dont have there own `this`, the inhearit from
        the surrounding lexical context, so `this` refers to the obj
      </p>
      <br />
      <p>
        answer 17:it will print val : 99, once the function is .bind() `this`
        cant no longer be overridden even with .call() or .apply().
      </p>
      <br />
      <p>
        answer 18: will print undefind `this` in arrow function refers to window
        if the not inherit .
      </p>
      <br />
      <p>
        answer 19: will print 'button', becuase we are using reguller function
        inside add event listner.
      </p>
      <br />
      <p>
        answer 20: will print undefind becuase the arrow inherit from the global
        object.
      </p>
      <br />
      <p>answer 21: setInterval(counter.inc.bind(counter), 100);</p>
      <br />
      <p>answer 22: button.addEventListener('click', function (){})</p>
      <br />
      <p>answer 23:add .bind(this)</p>
      <br />
      <p>
        answer 24: the arrow function inherit from the global obj so the print
        will be undefind
      </p>
      <br />
      <p>answer 25:</p>
      <br />
      <p>answer 26:
        
      </p>
    </div>
  );
};

export default JS_this_bind_arrow;
