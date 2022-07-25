export const LanguageExample = [
  {
    id: 75,
    is_archived: false,
    name: 'C (Clang 7.0.1)',
    example: utf8_to_b64(`#include <stdio.h>

    int main(void) {
      char name[10];
      scanf("%s", name);
      printf("hello, %s", name);
      return 0;
    }`),
    value: 'c',
  },
  {
    id: 52,
    is_archived: false,
    name: 'C++ (GCC 7.4.0)',
    example: utf8_to_b64(`#include <iostream>

int main() {
    std::cout << "Hello World, C++!";
    return 0;
}`),
    value: 'cpp',
  },
  {
    id: 63,
    is_archived: false,
    name: 'JavaScript (Node.js 12.14.0)',
    example: utf8_to_b64(
      `const a = Math.random();
console.log(a);`
    ),
    value: 'javascript',
  },
  {
    id: 51,
    is_archived: false,
    name: 'C# (Mono 6.6.0.161)',
    example: utf8_to_b64(
      `using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharpTutorials
{
    class Program
    {
        static void Main(string[] args)
        {
            string message = "Hello World, C#!!";

            Console.WriteLine(message);
        }
    }
}
      `
    ),
    value: 'csharp',
  },
  {
    id: 62,
    is_archived: false,
    name: 'Java (OpenJDK 13.0.1)',
    example: utf8_to_b64(
      `class Main {

    public static void main(String[] args) {
        
        System.out.println("Hello World, Java!!");
    }
}`
    ),
    value: 'java',
  },
  {
    id: 68,
    is_archived: false,
    name: 'PHP (7.4.1)',
    example: utf8_to_b64(`<?php echo '<p>Hello World, PHP</p>'; ?>`),
    value: 'python',
  },
  {
    id: 71,
    is_archived: false,
    name: 'Python (3.8.1)',
    example: utf8_to_b64(`print("Hello World, Python!!")`),
    value: 'python',
  },
  {
    id: 74,
    is_archived: false,
    name: 'TypeScript (3.7.4)',
    example: utf8_to_b64(`let message: string = 'Hello World, Typescript!';
console.log(message);`),
    value: 'typescript',
  },
];

function utf8_to_b64(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
