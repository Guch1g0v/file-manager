# File-manager

[Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)

## Commands

This file manager provides several commands to interact with the filesystem. Below is a list of available commands with descriptions, options, and examples.

## Note on File and Directory Names

For all file or directory names that contain spaces or other special characters, the full path should be enclosed in single or double quotes. This applies to any command where file paths are provided, such as `add`, `cd`, `compress`, `cp` and others.

**Example:**

```bash
cat "/path/to/directory with spaces/ file with spaces file.txt"
compress "file with spaces file.txt" "file with spaces file.txt.br"
cd "/path/to/directory with spaces"
decompress "archive file.txt.br" "file.txt"
```

### 1. `add`

Creates a new file in the current directory or at the specified file path.

**Options:**

- `fileName` (string): The name of the file to create (can include the full file path).

**Example:**

```bash
add /path/to/directory/example.txt
```

```bash
add example.txt
```

### 2. `cat`

Displays the contents of a file.

**Options:**

- `filePath` (string): The path to the file to display.

**Example:**

```bash
cat /path/to/directory/example.txt
```

```bash
cat example.txt
```

### 3. `cd`

Changes the current working directory.

**Options:**

- `pathToDirectory` (string, optional): The target directory. If omitted, defaults to the home directory (`~`). You can also use `-` to return to the previous directory. If the directory name contains spaces or other non-standard characters, enclose the path in single or double quotes.

**Example:**

```bash
cd /path/to/directory
cd "/path/to/directory with spaces"
```

### 4. `clear`

Clears the terminal screen.

**Options:**

- No options required.

**Example:**

```bash
clear
```

### 5. `cp`

Copies a file to a destination directory.

**Options:**

- `sourceFilePath` (string): The path to the file to copy.
- `destinationDirectory` (string): The directory where the file should be copied.

**Example:**

```bash
cp source.txt /path/to/destination/
```

### 6. `ls`

Lists the contents of a directory.

**Options:**

- `directoryPath` (string, optional): The directory to list. If omitted, it lists the current directory.

**Example:**

```bash
ls
ls /path/to/directory
```

### 7. `rm`

Removes a file from the current directory.

**Options:**

- `fileName` (string): The name of the file to remove.

**Example:**

```bash
rm example.txt
```

### 8. `rn`

Renames a file.

**Options:**

- `oldFileName` (string): The current name of the file.
- `newFileName` (string): The new name of the file.

**Example:**

```bash
rn oldname.txt newname.txt
```

### 9. `mv`

Moves a file to a new location (or renames it by moving to a different file name).

**Options:**

- `sourceFilePath` (string): The path to the file to move.
- `destinationDirectory` (string): The new file path (including file name) or directory to move the file to.

**Example:**

```bash
mv file.txt /new/path/to/directory
```

### 10. `echo`

Prints the provided arguments to the terminal.

**Options:**

- `options` (string): The string to print.

**Example:**

```bash
echo "Hello, World!"
```

### 11. `hash`

Generates a SHA-256 hash of the specified file.

**Options:**

- `filePath` (string): The path to the file to hash.

**Example:**

```bash
hash file.txt
```

### 12. `os`

Displays information about the operating system.

**Options:**

- `--EOL`: Prints the end-of-line sequence.
- `--cpus`: Prints information about the system's CPUs.
- `--homedir`: Prints the home directory.
- `--username`: Prints the system's username
- `--architecture`: Prints the system's architecture.

**Example:**

```bash
os --cpus
os --homedir
```

### 13. `compress`

Compresses a file.

**Options:**

- `filePath` (string): The path to the file to compress.
- `outputFilePath` (string): The name or full path of the compressed file.

**Example:**

```bash
compress file.txt file.txt.br
compress /path/to/file.txt /path/to/file.txt.br
```

### 14. `decompress`

Decompresses a file.

**Options:**

- `filePath` (string): The path to the file to decompress.
- `outputFilePath` (string): The name or full path of the decompressed file or folder.

**Example:**

```bash
decompress file.txt.br file.txt
decompress /path/to/file.txt.br /path/to/file.txt
```

### 15. `up`

Moves up one directory level.

**Options:**

- No options required.

**Example:**

```bash
up
```
