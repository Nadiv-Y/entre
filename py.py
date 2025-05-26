import requests
from bs4 import BeautifulSoup
import pandas as pd


def decodingASecretMessage(doc_url):
    html_response = requests.get(doc_url)
    soup = BeautifulSoup(html_response.text, 'html.parser')
    tables = soup.find_all('table')

    if not tables:
        print("No tables found.")
        return None

    table = pd.read_html(str(tables[0]))[0]
    table.columns = table.iloc[0]
    table = table.iloc[1:].reset_index(drop=True)
    table['x-coordinate'] = pd.to_numeric(table['x-coordinate'], errors='coerce')
    table['y-coordinate'] = pd.to_numeric(table['y-coordinate'], errors='coerce')

    max_x = table['x-coordinate'].max()
    max_y = table['y-coordinate'].max()

    canvas = [[' ' for _ in range(max_x + 1)] for _ in range(max_y + 1)]

    for _, row in table.iterrows():
        x = int(row['x-coordinate'])
        y = int(row['y-coordinate'])
        char = row['Character']
        canvas[y][x] = char

    for row in reversed(canvas):
        print(''.join(row))

decodingASecretMessage(
    "https://docs.google.com/document/d/e/2PACX-1vSZ1vDD85PCR1d5QC2XwbXClC1Kuh3a4u0y3VbTvTFQI53erafhUkGot24ulET8ZRqFSzYoi3pLTGwM/pub")
