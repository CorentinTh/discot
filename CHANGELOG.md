# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Next
#### Changed
- Better CI/CD

## 1.3.0
#### Added
- Promise based commands (async functions)

### 1.2.0
#### Added
- Usage in command object for help message

#### Changed
- Command name can start with prefix or not. For example, with prefix `!`, command name can be `ping` or `!ping`

### 1.1.3
#### Added
- Added [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- Added [CONTRIBUTING.md](CONTRIBUTING.md)
- Added [CHANGELOG.md](CHANGELOG.md)
- Added author in [package.json](package.json)
- Added keywords in [package.json](package.json)

### 1.1.2
### Changed
- The `args` parameter in the `action` function in commands is now always set. 

## 1.1.1
### Added 
- The bot can't execute commands send by himself (prevent loops)

## 1.1.0
### Added
- Argument parser now handles quoted arguments with double quotes
### Fixed
- Argument count potential break 

## 1.0.1
### Added
- Added Typescript types export
- Help message is displayed in a chat block

## 1.0.0
- First release

