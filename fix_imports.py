import os
import re

root_dir = r"c:\Users\User\Desktop\thushalini\src"

replacements = [
    (r"import\s*{\s*HeaderSection\s*}\s*from\s*\"(\.\.?\/)+Home\/sections\/HeaderSection\";", "import { Navbar } from \"../../components/Navbar\";"),
    (r"import\s*{\s*FooterSection\s*}\s*from\s*\"(\.\.?\/)+Home\/sections\/FooterSection\";", "import { Footer } from \"../../components/Footer\";"),
    (r"import\s*{\s*HeaderSection\s*}\s*from\s*\"(\.\.\/)*Home\/sections\/HeaderSection\";", "import { Navbar } from \"../../components/Navbar\";"),
    (r"import\s*{\s*FooterSection\s*}\s*from\s*\"(\.\.\/)*Home\/sections\/FooterSection\";", "import { Footer } from \"../../components/Footer\";"),
    (r"<HeaderSection\s*/>", "<Navbar />"),
    (r"<FooterSection\s*/>", "<Footer />"),
]

# Specifically for pages that might have different relative depths
pages_dir = os.path.join(root_dir, "pages")

for subdir, dirs, files in os.walk(pages_dir):
    for file in files:
        if file.endswith(".tsx"):
            filepath = os.path.join(subdir, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            
            # Use relative depth calculation
            rel_path = os.path.relpath(subdir, root_dir)
            depth = len(rel_path.split(os.sep))
            prefix = "../" * depth
            
            # Simple replacements for HeaderSection/FooterSection
            # Match any import that looks like it's pointing to Home/sections
            new_content = re.sub(r"import\s*{\s*HeaderSection\s*}\s*from\s*[\"'].*HeaderSection[\"'];", f"import {{ Navbar }} from \"{prefix}components/Navbar\";", new_content)
            new_content = re.sub(r"import\s*{\s*FooterSection\s*}\s*from\s*[\"'].*FooterSection[\"'];", f"import {{ Footer }} from \"{prefix}components/Footer\";", new_content)
            
            new_content = new_content.replace("<HeaderSection />", "<Navbar />")
            new_content = new_content.replace("<FooterSection />", "<Footer />")
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")

# Also check dashboard dir
dashboard_dir = os.path.join(root_dir, "dashboard")
for subdir, dirs, files in os.walk(dashboard_dir):
    for file in files:
        if file.endswith(".tsx"):
            filepath = os.path.join(subdir, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            rel_path = os.path.relpath(subdir, root_dir)
            depth = len(rel_path.split(os.sep))
            prefix = "../" * depth
            
            new_content = re.sub(r"import\s*{\s*HeaderSection\s*}\s*from\s*[\"'].*HeaderSection[\"'];", f"import {{ Navbar }} from \"{prefix}components/Navbar\";", new_content)
            new_content = re.sub(r"import\s*{\s*FooterSection\s*}\s*from\s*[\"'].*FooterSection[\"'];", f"import {{ Footer }} from \"{prefix}components/Footer\";", new_content)
            
            new_content = new_content.replace("<HeaderSection />", "<Navbar />")
            new_content = new_content.replace("<FooterSection />", "<Footer />")
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
