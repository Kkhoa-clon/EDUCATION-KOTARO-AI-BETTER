import re

# Read the file
with open('frontend/src/pages/Lab2DPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the categories
categories = {
    'Vật Lý': 'Vật Lý',
    'Hóa Học': 'Hóa Học',
    'Sinh Học': 'Sinh Học',
    'Toán Học': 'Toán Học'
}

# Function to add category to experiments in a category
def add_category_to_experiments(content, category_name, category_value):
    # Find the category block
    pattern = rf"('{category_name}': \[\s*(.*?)\s*\],)"
    match = re.search(pattern, content, re.DOTALL)
    if match:
        experiments_block = match.group(1)
        # Find experiments without category
        experiments = re.findall(r'\{ name: \'(.*?)\', url: \'(.*?)\'(?:, description: \'(.*?)\')?\s*\}', experiments_block)
        new_experiments = []
        for exp in experiments:
            name, url, desc = exp
            if 'category:' not in experiments_block.split('{ name: \'' + name)[1].split('}')[0]:
                # Add category
                if desc:
                    new_exp = f"{{ name: '{name}', url: '{url}', category: '{category_value}', description: '{desc}' }}"
                else:
                    new_exp = f"{{ name: '{name}', url: '{url}', category: '{category_value}' }}"
                # Replace in block
                old_exp = f"{{ name: '{name}', url: '{url}'" + (f", description: '{desc}'" if desc else "") + " }"
                new_experiments.append((old_exp, new_exp))
        # Apply replacements
        for old, new in new_experiments:
            experiments_block = experiments_block.replace(old, new)
        # Replace the block
        content = content.replace(match.group(1), experiments_block)
    return content

# Apply to all categories
for cat_name, cat_value in categories.items():
    content = add_category_to_experiments(content, cat_name, cat_value)

# Write back
with open('frontend/src/pages/Lab2DPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Categories added successfully.")
