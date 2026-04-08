#define MyAppName "PACTA"
#define MyAppVersion "{VERSION_PLACEHOLDER}"
#define MyAppPublisher "PACTA Team"
#define MyAppURL "https://github.com/PACTA-Team/pacta_appweb"

[Setup]
AppId={{A1B2C3D4-E5F6-7890-ABCD-EF1234567890}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
AllowNoIcons=yes
LicenseFile=../../LICENSE
OutputDir=.
OutputBaseFilename=pacta-setup-{#MyAppVersion}
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=admin
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Files]
Source: "node\*"; DestDir: "{app}\node"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "app\*"; DestDir: "{app}\app"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "shared\*"; DestDir: "{app}\shared"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "nssm.exe"; DestDir: "{app}"; Flags: ignoreversion

[Run]
Filename: "{app}\nssm.exe"; Parameters: "install Pacta ""{app}\node\node.exe"" ""{app}\app\server.js"""; Flags: runhidden
Filename: "{app}\nssm.exe"; Parameters: "set Pacta AppDirectory ""{app}\app"""; Flags: runhidden
Filename: "{app}\nssm.exe"; Parameters: "set Pacta DisplayName ""{#MyAppName}"""; Flags: runhidden
Filename: "{app}\nssm.exe"; Parameters: "set Pacta Start SERVICE_AUTO_START"; Flags: runhidden
Filename: "{app}\nssm.exe"; Parameters: "set Pacta AppEnvironmentExtra NODE_ENV=production PORT=3000"; Flags: runhidden
Filename: "{app}\nssm.exe"; Parameters: "start Pacta"; Flags: runhidden

[UninstallRun]
Filename: "{app}\nssm.exe"; Parameters: "stop Pacta"; Flags: runhidden
Filename: "{app}\nssm.exe"; Parameters: "remove Pacta confirm"; Flags: runhidden

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "http://127.0.0.1:3000"
Name: "{group}\Start PACTA (Manual)"; Filename: "{app}\start.bat"; WorkingDir: "{app}"
Name: "{group}\Uninstall {#MyAppName}"; Filename: "{uninstallexe}"
