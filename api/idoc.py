import requests
from bs4 import BeautifulSoup

URL = "https://www.idoc.state.il.us/subsections/search/ISinms2.asp?idoc="

def getIdocProfile(idoc):
    out = {}
    html = BeautifulSoup(requests.post(URL + str(idoc)).content, 'html.parser')

    name_tag = html.find('font', attrs={'size':'4'})
    name = [text.replace(' ', '') for text in name_tag.text.split('-')[1].split(',')]
    out["name"] = name[0] + ", " + name[1]

    tables = html.find_all('table', attrs={'width':'390'})
    for table in tables:
        if 'Date of Birth' in table.text:
            physicalProfTable = table
        if "Admission Date" in table.text:
            admissionInfoTable = table
        if "MITTIMUS" in table.text:
            sentencingTable = table
        if "Parent Institution" in table.text:
            institutionTable = table
            print(institutionTable)



    for row in physicalProfTable.find_all('tr'):
        vals = row.find_all('td')
        if 'Date of Birth' in vals[0].text:
            out["dob"] = vals[1].text
        if 'Sex' in vals[0].text:
            out["sex"] = vals[1].text
        if 'Race' in vals[0].text:
            out["race"] = vals[1].text.split()[0]
    for row in admissionInfoTable.find_all('tr'):
        vals = row.find_all('td')
        if 'Admission Date' in vals[0].text:
            out["admission_date"] = vals[1].text
        if 'Projected Discharge Date' in vals[0].text:
            out["discharge_date"] = vals[1].text
        if 'Projected Parole Date' in vals[0].text:
            out["msr_date"] = vals[1].text
    for row in institutionTable.find_all('tr'):
        vals = row.find_all('td')
        if 'Parent Institution' in vals[0].text:
            out["parent_institution"] = " ".join(vals[1].text.split())
    rows = sentencingTable.find_all('tr')
    i = 0
    sentences = []

    while i < len(rows):
        curRow = rows[i]
        if "MITTIMUS" in curRow.text:
            sentence = {}
            while "CLASS" not in curRow.text:
                i += 1
                curRow = rows[i]
            sentence['class'] = curRow.find_all('td')[1].text
            while "OFFENSE" not in curRow.text:
                i += 1
                curRow = rows[i]
            sentence['offense'] = curRow.find_all('td')[1].text
            while "CUSTODY DATE" not in curRow.text:
                i += 1
                curRow = rows[i]
            sentence['custody_date'] = curRow.find_all('td')[1].text
            while "SENTENCE" not in curRow.text:
                i += 1
                curRow = rows[i]
            sentence['sentence'] = curRow.find_all('td')[1].text
            sentences.append(sentence)
        i += 1
    

    longestSent = {}
    length = [0,0]
    for sentence in sentences:
        print(sentence)
        tmp = sentence['sentence'].split()
        years = int(tmp[0])
        months = int(tmp[2])
        if years > length[0]:
            length = [years, months]
            longestSent = sentence
        elif years == length[0]:
            if months > length[1]:
                length = [years, months]
                longestSent = sentence

    out["crime_class"] = "Class " + longestSent['class']
    out["holding_offense"] = " ".join(longestSent['offense'].split())
    out["sentence_years"] = length[0]
    out["sentence_months"] = length[1]
    out["custody_date"] = longestSent['custody_date']
    print(out)

    #next_table = name_tag.find_parent('table').next_sibling()
    #rows=next_table.find_all('tr')

    return out
