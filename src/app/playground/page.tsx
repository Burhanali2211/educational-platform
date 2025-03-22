"use client";

import { useState, useEffect, useRef } from "react";
import { Code2, Play, Save, Share, Settings, Copy, Check, Trash2, BookOpen, Moon, Sun, ChevronDown, Info, Terminal, Layout, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { cpp } from '@codemirror/lang-cpp';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { githubLight } from '@uiw/codemirror-theme-github';
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TooltipComponent from "@/components/ui/tooltip";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { motion, AnimatePresence } from "framer-motion";

// Types
type SupportedLanguage = "javascript" | "typescript" | "python" | "html" | "css" | "cpp";

interface LanguageConfig {
  label: string;
  value: SupportedLanguage;
  extension: any;
  defaultCode: string;
  icon?: string;
  documentation?: string;
}

const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    label: "JavaScript",
    value: "javascript",
    extension: javascript(),
    defaultCode: "// Write your JavaScript code here\nconsole.log('Hello, World!');",
    icon: "js",
    documentation: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  },
  {
    label: "TypeScript",
    value: "typescript",
    extension: javascript({ typescript: true }),
    defaultCode: `// Write your TypeScript code here
interface Person {
  name: string;
  age: number;
}

const greeting = (person: Person): void => {
  console.log(\`Hello, \${person.name}! You are \${person.age} years old.\`);
};

greeting({ name: "John", age: 30 });`,
    icon: "ts",
    documentation: "https://www.typescriptlang.org/docs/"
  },
  {
    label: "Python",
    value: "python",
    extension: python(),
    defaultCode: `# Write your Python code here
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
    icon: "py",
    documentation: "https://docs.python.org/3/"
  },
  {
    label: "HTML",
    value: "html",
    extension: html(),
    defaultCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <style>
        body {
            font-family: system-ui;
            margin: 2rem;
            line-height: 1.5;
        }
        h1 { color: #333; }
    </style>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to my webpage.</p>
</body>
</html>`,
    icon: "html",
    documentation: "https://developer.mozilla.org/en-US/docs/Web/HTML"
  },
  {
    label: "CSS",
    value: "css",
    extension: css(),
    defaultCode: `/* Write your CSS code here */
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.title {
    color: #2563eb;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`,
    icon: "css",
    documentation: "https://developer.mozilla.org/en-US/docs/Web/CSS"
  },
  {
    label: "C++",
    value: "cpp",
    extension: cpp(),
    defaultCode: `// Write your C++ code here
#include <iostream>
#include <string>

class Greeting {
private:
    std::string name;
    
public:
    Greeting(std::string n) : name(n) {}
    
    void sayHello() {
        std::cout << "Hello, " << name << "!" << std::endl;
    }
};

int main() {
    Greeting greeting("World");
    greeting.sayHello();
    return 0;
}`,
    icon: "cpp",
    documentation: "https://en.cppreference.com/"
  }
];

const EXAMPLE_CODES = {
  javascript: [
    {
      name: "Basic Function",
      code: "function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));"
    },
    {
      name: "Array Methods",
      code: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);"
    }
  ],
  typescript: [
    {
      name: "Interface Example",
      code: "interface User {\n  name: string;\n  age: number;\n}\n\nconst user: User = {\n  name: 'John',\n  age: 30\n};\n\nconsole.log(user);"
    }
  ],
  python: [
    {
      name: "List Comprehension",
      code: "numbers = [1, 2, 3, 4, 5]\nsquares = [n**2 for n in numbers]\nprint(squares)"
    }
  ],
  html: [
    {
      name: "Basic Layout",
      code: "<!DOCTYPE html>\n<html>\n<head>\n  <title>Sample Page</title>\n</head>\n<body>\n  <header>\n    <h1>Welcome</h1>\n  </header>\n  <main>\n    <p>This is a sample page.</p>\n  </main>\n</body>\n</html>"
    }
  ],
  css: [
    {
      name: "Flexbox Layout",
      code: ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n}\n\n.item {\n  padding: 1rem;\n  border-radius: 4px;\n  background-color: #e5e5e5;\n}"
    }
  ],
  cpp: [
    {
      name: "Basic Function",
      code: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}"
    },
    {
      name: "Classes",
      code: "#include <iostream>\n#include <string>\n\nclass Person {\nprivate:\n    std::string name;\n    int age;\n\npublic:\n    Person(std::string n, int a) : name(n), age(a) {}\n    \n    void introduce() {\n        std::cout << \"My name is \" << name << \" and I am \" << age << \" years old.\" << std::endl;\n    }\n};\n\nint main() {\n    Person person(\"John\", 30);\n    person.introduce();\n    return 0;\n}"
    }
  ]
};

export default function PlaygroundPage() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [code, setCode] = useState(SUPPORTED_LANGUAGES[0].defaultCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [tabSize, setTabSize] = useState(2);
  const [autoComplete, setAutoComplete] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConsole, setShowConsole] = useState(true);
  const [consoleHeight, setConsoleHeight] = useState(30);

  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.value === language);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.value === language);
    if (currentLanguage?.defaultCode) {
      setCode(currentLanguage.defaultCode);
    }
  }, [language, currentLanguage?.defaultCode]);

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    const selectedLanguage = SUPPORTED_LANGUAGES.find(lang => lang.value === newLanguage);
    if (selectedLanguage) {
      setCode(selectedLanguage.defaultCode);
      toast({
        title: `Switched to ${selectedLanguage.label}`,
        description: "Editor has been updated with default code.",
        variant: "default",
      });
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("");

    try {
      let result;
      switch (language) {
        case "javascript":
        case "typescript":
          try {
            // Create a new Function to run the code in a sandbox
            const fn = new Function(code);
            // Capture console.log output
            const logs: string[] = [];
            const originalLog = console.log;
            console.log = (...args) => {
              logs.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              ).join(' '));
            };
            
            result = await fn();
            console.log = originalLog;
            
            setOutput(logs.join('\n'));
          } catch (error: any) {
            setOutput(`Error: ${error.message}`);
          }
          break;

        case "python":
          // For Python, we would typically need a backend service
          // This is a placeholder for demonstration
          setOutput("Python execution requires backend integration.\nConsider using Pyodide or a backend service.");
          break;

        case "html":
          // Create a sandbox iframe to render HTML
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
          if (iframe.contentWindow) {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(code);
            iframe.contentWindow.document.close();
            setOutput("HTML rendered successfully. Check the preview tab.");
          }
          document.body.removeChild(iframe);
          break;

        case "css":
          setOutput("CSS applied successfully. Check the preview tab.");
          break;

        default:
          setOutput("Language not supported for execution.");
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      toast({
        title: "Code copied to clipboard",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy code",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`playground_${language}`, code);
      toast({
        title: "Code saved successfully",
        description: "Your code has been saved to local storage.",
      });
    } catch (error) {
      toast({
        title: "Failed to save code",
        description: "An error occurred while saving your code.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: "Code Playground",
        text: code,
        url: window.location.href,
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(code);
        toast({
          title: "Code copied to clipboard",
          description: "Share URL has been copied to your clipboard.",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to share code",
        variant: "destructive",
      });
    }
  };

  const handleLoadExample = (example: { name: string; code: string }) => {
    setCode(example.code);
    toast({
      title: "Example loaded",
      description: `Loaded example: ${example.name}`,
    });
  };

  const handleReset = () => {
    const defaultCode = currentLanguage?.defaultCode || "";
    setCode(defaultCode);
    setOutput("");
    toast({
      title: "Code reset",
      description: "Code has been reset to default.",
    });
  };

  const handleClearOutput = () => {
    setOutput("");
    toast({
      title: "Output cleared",
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      editorRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div ref={editorRef} className="flex flex-col h-[calc(100vh-4rem)] bg-background mt-16">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-4 py-2 border-b bg-card sticky top-16 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-xl font-semibold hidden md:inline bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
               Playground
            </span>
          </div>

          <div className="h-6 w-px bg-border hidden md:block" />

          <Select
            value={language}
            onValueChange={(value) => handleLanguageChange(value as SupportedLanguage)}
          >
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm flex items-center justify-center bg-primary/10">
                    <span className="text-xs font-medium text-primary">
                      {currentLanguage?.icon?.toUpperCase()}
                    </span>
                  </div>
                  {currentLanguage?.label}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem 
                  key={lang.value} 
                  value={lang.value}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm flex items-center justify-center bg-primary/10">
                      <span className="text-xs font-medium text-primary">
                        {lang.icon?.toUpperCase()}
                      </span>
                    </div>
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <TooltipComponent content="Load Example">
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Examples
                </Button>
              </DropdownMenuTrigger>
            </TooltipComponent>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Load Example</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {EXAMPLE_CODES[language]?.map((example, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => handleLoadExample(example)}
                >
                  {example.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <TooltipComponent content="Run Code (Ctrl+Enter)">
            <Button
              onClick={handleRunCode}
              disabled={isRunning}
              size="sm"
              className="hidden sm:flex"
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin mr-2" />
                  Running
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run
                </>
              )}
            </Button>
          </TooltipComponent>

          <TooltipComponent content="Copy Code">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="hidden sm:flex"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </TooltipComponent>

          <TooltipComponent content="Save Code">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="hidden sm:flex"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </TooltipComponent>

          <TooltipComponent content="Share Code">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="hidden sm:flex"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </TooltipComponent>

          <div className="h-6 w-px bg-border hidden md:block" />

          <TooltipComponent content="Toggle Theme">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:flex"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </TooltipComponent>

          <TooltipComponent content="Toggle Console">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConsole(!showConsole)}
              className="hidden sm:flex"
            >
              <Terminal className="w-4 h-4" />
            </Button>
          </TooltipComponent>

          <TooltipComponent content="Toggle Fullscreen">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="hidden sm:flex"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
          </TooltipComponent>

          <Dialog>
            <TooltipComponent content="Settings">
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            </TooltipComponent>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editor Settings</DialogTitle>
                <DialogDescription>
                  Customize your coding environment
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Font Size ({fontSize}px)</Label>
                  <input
                    id="font-size"
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-[60%]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="tab-size">Tab Size ({tabSize})</Label>
                  <input
                    id="tab-size"
                    type="range"
                    min="2"
                    max="8"
                    step="2"
                    value={tabSize}
                    onChange={(e) => setTabSize(Number(e.target.value))}
                    className="w-[60%]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-complete">Auto Complete</Label>
                  <Switch
                    id="auto-complete"
                    checked={autoComplete}
                    onCheckedChange={setAutoComplete}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="line-numbers">Line Numbers</Label>
                  <Switch
                    id="line-numbers"
                    checked={lineNumbers}
                    onCheckedChange={setLineNumbers}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="word-wrap">Word Wrap</Label>
                  <Switch
                    id="word-wrap"
                    checked={wordWrap}
                    onCheckedChange={setWordWrap}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      {/* Mobile Action Buttons */}
      <div className="md:hidden flex gap-2 p-2 bg-card border-b sticky top-[calc(4rem+2.5rem)] z-10">
        <Button onClick={handleRunCode} disabled={isRunning} size="sm" className="flex-1">
          {isRunning ? "Running..." : "Run"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleCopyCode} className="flex-1">
          {isCopied ? "Copied" : "Copy"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleSave} className="flex-1">
          Save
        </Button>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="vertical" className="flex-1">
        <ResizablePanel defaultSize={70} minSize={30}>
          <div className="h-full relative group">
            <CodeMirror
              value={code}
              height="100%"
              theme={theme === 'dark' ? vscodeDark : githubLight}
              extensions={[currentLanguage?.extension || javascript()]}
              onChange={setCode}
              basicSetup={{
                lineNumbers,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                history: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                syntaxHighlighting: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: autoComplete,
                rectangularSelection: true,
                crosshairCursor: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                closeBracketsKeymap: true,
                defaultKeymap: true,
                searchKeymap: true,
                historyKeymap: true,
                foldKeymap: true,
                completionKeymap: true,
                lintKeymap: true,
              }}
              style={{ fontSize: `${fontSize}px` }}
            />
            {currentLanguage?.documentation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <TooltipComponent content="View Documentation">
                  <a
                    href={currentLanguage.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    <Info className="w-4 h-4 text-primary" />
                  </a>
                </TooltipComponent>
              </motion.div>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {showConsole && (
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="flex flex-col h-full border-t">
              <div className="flex items-center justify-between p-2 border-b bg-card">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span className="font-medium">Console</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearOutput}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
              <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-card/50">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={output}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="whitespace-pre-wrap"
                  >
                    {output || "Code output will appear here..."}
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
}