import os, sys
import dropbox
from datetime import datetime
from datetime import timedelta
from datetime import date
import time
import pytz
import json
import textwrap
import plotly
import plotly.graph_objs as go
#import pandas as pd

LINE_WIDTH_CHARS = 50   # For annotations
NOMIE_JSON = "Android-Pixel_3-544529144-UPDATED.nomie.json"
NOMIE_DROPBOX_PATH = "/Apps/Nomie/"
LOCAL_DIR = "./public/raw/"
LOCAL_FILE = None
epoch = datetime.utcfromtimestamp(0)
epoch_date = datetime.utcfromtimestamp(0).date()
wrap = textwrap.TextWrapper(width=LINE_WIDTH_CHARS, break_long_words=True, replace_whitespace=False)
nomie_file = None
debug = False
trackers = {}
missing_trackers = {}
events = []
all_data = []
notes = []
annotations = []
shapes = []
images = []
date_range = []
earliest_event = sys.maxsize
latest_event = 0
discarded = 0

# Relevant dates
regimen_start_date = date(2016, 8, 10)
regimen_100_days = date(2016, 11, 18)
regimen_200_days = date(2017, 2, 26)
start_chart_date = datetime(2016, 1, 1, 0, 0, 0)
end_chart_date = datetime(2017, 2, 1, 23, 59, 59)
slider_initial_start = date(2016, 7, 3)

# Blood draws: 13 pre, 7 post
blood_draw_dates = [date(2016, 2, 16), date(2016, 3, 1),date(2016, 3, 15),date(2016, 3, 29),date(2016, 4, 12),date(2016, 4, 26),date(2016, 5, 10),date(2016, 5, 24),date(2016, 6, 7),date(2016, 6, 21),date(2016, 7, 5),date(2016, 7, 19),date(2016, 8, 2),
                    date(2016, 8, 16),date(2016, 8, 30),date(2016, 9, 13),date(2016, 9, 27),date(2016, 10, 18),date(2016, 11, 1),date(2016, 11, 29)]

# MRI scans: 1 pre, 1 post
mri_dates = [date(2016, 6, 16), date(2017, 1, 9)]

# EEG Sessions: 3 pre (playing a video game), 97 post
eeg_sessions = [date(2016, 11, 29),date(2016, 8, 20),date(2016, 8, 27),date(2016, 10, 3),date(2016, 9, 23),date(2016, 11, 4),date(2016, 9, 6),date(2016, 9, 28),date(2016, 11, 30),date(2016, 10, 20),date(2017, 1, 16),date(2016, 11, 2),date(2016, 10, 21),date(2016, 12, 3),
date(2016, 8, 14),date(2016, 10, 23),date(2016, 9, 11),date(2016, 8, 24),date(2016, 9, 18),date(2016, 11, 17),date(2016, 9, 12),date(2016, 10, 8),date(2016, 9, 27),date(2016, 9, 29),date(2016, 11, 6),date(2016, 9, 16),date(2016, 10, 31),date(2016, 8, 26),date(2017, 2, 22),
date(2016, 8, 25),date(2016, 9, 30),date(2016, 8, 16),date(2016, 8, 29),date(2017, 1, 24),date(2017, 2, 25),date(2016, 10, 13),date(2016, 11, 5),date(2016, 10, 22),date(2016, 9, 7),date(2016, 8, 18),date(2016, 10, 28),date(2016, 9, 22),date(2016, 10, 30),date(2016, 10, 12),
date(2016, 11, 15),date(2017, 2, 16),date(2016, 10, 8),date(2016, 8, 15),date(2016, 8, 17),date(2016, 10, 27),date(2016, 10, 15),date(2017, 2, 26),date(2016, 11, 7),date(2016, 8, 31),date(2016, 10, 1),date(2016, 10, 17),date(2017, 1, 20),date(2017, 3, 14),date(2016, 9, 13),
date(2016, 10, 19),date(2016, 11, 8),date(2016, 9, 8),date(2016, 10, 26),date(2016, 8, 13),date(2016, 9, 10),date(2016, 11, 18),date(2016, 8, 22),date(2016, 9, 15),date(2016, 10, 24),date(2017, 2, 28),date(2017, 2, 27),date(2016, 8, 28),date(2016, 10, 16),date(2016, 11, 1),
date(2016, 10, 11),date(2016, 9, 4),date(2016, 12, 1),date(2016, 9, 9),date(2017, 1, 2),date(2016, 11, 14),date(2016, 8, 23),date(2017, 1, 22),date(2016, 8, 19),date(2016, 8, 30),date(2017, 3, 12),date(2016, 9, 14),date(2017, 2, 20),date(2016, 10, 2),date(2016, 11, 13),
date(2016, 9, 20),date(2016, 10, 14),date(2016, 9, 1),date(2016, 11, 22)]


class Tracker(object):
    day_totals = []
    def __init__(self, jsn, num_days):
        self.__dict__ = json.loads(jsn)
        self.day_totals = [None] * (num_days)        # Initializes an array the length of our entire date range

    def __str__(self):
        return self._id

class Event(object):
    def __init__(self, jsn):
        self.__dict__ = json.loads(jsn)

class Note(object):
    def __init__(self, jsn):
        self.__dict__ = json.loads(jsn)

def datetime_to_float(datetime):
    total_seconds =  (datetime - epoch).total_seconds()
    # total_seconds will be in decimals (millisecond precision)
    return total_seconds

def date_to_float(date):
    total_seconds =  (date - epoch_date).total_seconds()
    return total_seconds

# Check if we have dropbox perms (not needed)
try:  
    os.environ["DROPBOX_API_TOKEN"]
    print("\n* Connecting to Dropbox...")
    dbx = dropbox.Dropbox(os.environ["DROPBOX_API_TOKEN"])
    dbx.users_get_current_account()
    most_recent = datetime.fromtimestamp(0)
    local_modified = 0
    remote_modified = 0

    # Find most-recently modified remote file
    for file in dbx.files_list_folder(NOMIE_DROPBOX_PATH).entries:
        if file.client_modified > most_recent:
            most_recent = file.client_modified
            nomie_file = file
    print("* Most-recently modified remote file is: " + nomie_file.path_display + " (at " + str(nomie_file.client_modified) + ")")

    # Create storage dir if not exists
    if not os.path.exists(LOCAL_DIR):
        print("Local directory "+ LOCAL_DIR + " not found, creating...")
        os.makedirs(LOCAL_DIR)

    LOCAL_FILE = LOCAL_DIR + nomie_file.name
    DO_DOWNLOAD = True

    # Check if we've already downloaded the file, and either download it or use our local copy
    if os.path.isfile(LOCAL_FILE):
        local_modified = os.path.getmtime(LOCAL_FILE)
        remote_modified = datetime_to_float(nomie_file.client_modified)
        print("Local file modified at " + str(local_modified) + " Remote modified at: " + str(remote_modified) + " (delta " + str((local_modified - remote_modified) / 60) + " min)")
        if local_modified >= remote_modified:
            print("Already have latest file; not downloading.")
            DO_DOWNLOAD = False

    if DO_DOWNLOAD:
        print("* Downloading file...")
        try:
            file = dbx.files_download_to_file(LOCAL_FILE, nomie_file.path_display)
        except dropbox.exceptions.HttpError as err:
            print("*** HTTP error", err)
            sys.exit(1)
except KeyError: 
    LOCAL_FILE = LOCAL_DIR + NOMIE_JSON
    

print("* Parsing json...")
with open(LOCAL_FILE) as f:
    data = f.read()
parsed_json = json.loads(data)

# Find earliest and latest event to determine date range.
for event in parsed_json['events']:
    # Ignore events after our end date
    if datetime.fromtimestamp(event['time'] / 1000) > end_chart_date:
        continue
    elif datetime.fromtimestamp(event['time'] / 1000) < start_chart_date:
        continue
    events.append(Event(json.dumps(event)))
    if event['time'] < earliest_event:
        earliest_event = event['time']
    if event['time'] > latest_event:
        latest_event = event['time']

# Event properties are: parent (id of tracker), type, time, offset (GMT), value, charge
print("Events: " + str(len(events)))

# The chart library requires that we create an array of days between the first event and the last
earliest_event = datetime.fromtimestamp(earliest_event / 1000)
latest_event = datetime.fromtimestamp(latest_event / 1000)
date_range = [earliest_event.date() + timedelta(n) for n in range(int ((latest_event - earliest_event).days) + 2)]
illness_dates = [len(date_range)]

print("Days: " + str(len(date_range)))

# Tracker properties are: _id, label, color, charge, config{ min, max, type }
# Create a dict of tracker objects for easy access by Tracker._id, and include the number of days
for tracker in parsed_json['trackers']:
    trackers[tracker['_id']] = Tracker(json.dumps(tracker), len(date_range))
    if debug:
        print(json.dumps(tracker, indent=4))
print("Trackers: " + str(len(trackers)))

# Notes properties are: value (the note text), and "time" (timestamp)
for note in parsed_json['notes']:
    notes.append(Note(json.dumps(note)))
print("Notes: " + str(len(notes)))


# Aggregate events by day, since we don't want any finer granularity.
# Loop through events and populate tracker.day_totals[] with each day's events
for event in events:
    event_day = datetime.fromtimestamp(event.time / 1000).date()
    day_index = (event_day - earliest_event.date()).days
    #print("Event timestamp: " + str(event_day) + " aggregating to day index " + str(day_index) + ": " + str(date_range[day_index]))
    try:
        tracker = trackers[event.parent]
        day_total = tracker.day_totals[day_index]
        if day_total is not None:
            tracker.day_totals[day_index] = day_total + int(event.value)
        else:
            tracker.day_totals[day_index] = int(event.value)
        if debug:
            print(str(event.time) + "\n\t" + tracker.label + ": Adding " + str(event.value) + " to day index: " + str(day_index) + " (total: " + str(tracker.day_totals[day_index]) + ")")
    except KeyError:
        # Not sure why an event would not also have a corresponding tracker, perhaps these are notes or some other data
        discarded += 1
        missing_trackers[event.parent] = 1
        pass

    if "Illness" in tracker.label or "Cold symptoms" in tracker.label or "Hangover" in tracker.label:
        illness_dates.append(date_range[day_index])
    # Images
    if "Blood Draw" == tracker.label:
        images.append(dict(
            source="https://i.imgur.com/24fqXAv.png",
            xref="x",
            yref="y",
            y=200,   # position in y units
            x=date_range[day_index],
            sizex=date_to_float(event_day),
            sizey=10,    # height in units of y
            xanchor="center",
            yanchor="middle",
            layer="above",
            opacity=1
        ))
        # Adds a URL
        annotations.append(dict(
            y=200,   # position in y units
            x=date_range[day_index],
            text="""<a href="https://www.google.com" target="_new">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>""",
            xanchor="center",
            yanchor="middle",
            showarrow=False
            ))
    elif "EEG" == tracker.label:
        images.append(dict(
            source="https://i.imgur.com/BUuDrIp.png",
            xref="x",
            yref="y",
            y=215,   # position in y units
            x=date_range[day_index],
            sizex=date_to_float(event_day),
            sizey=8,    # height in units of y
            xanchor="center",
            yanchor="middle",
            layer="above",
            opacity=1
        ))
        # Adds a URL
        annotations.append(dict(
            y=215,   # position in y units
            x=date_range[day_index],
            text="""<a href="https://www.google.com" target="_new">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>""",
            xanchor="center",
            yanchor="middle",
            showarrow=False
            ))
    elif "MRI" == tracker.label:
        images.append(dict(
            source="https://i.imgur.com/VYZmTTy.png",
            xref="x",
            yref="y",
            y=205,   # position in y units
            x=date_range[day_index],
            sizex=date_to_float(event_day),
            sizey=20,    # height in units of y
            xanchor="center",
            yanchor="middle",
            layer="above",
            opacity=1
        ))
        # Adds a URL
        annotations.append(dict(
            y=205,   # position in y units
            x=date_range[day_index],
            text="""<a href="https://www.google.com" target="_new">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>""",
            xanchor="center",
            yanchor="middle",
            showarrow=False
            ))
    elif "Running" in tracker.label:
        images.append(dict(
            source="https://i.imgur.com/HiipMqQ.png",
            xref="x",
            yref="y",
            y=125,   # position in y units
            x=date_range[day_index],
            sizex=date_to_float(event_day),
            sizey=10,    # height in units of y
            xanchor="center",
            yanchor="middle",
            layer="above",
            opacity=1
        ))
    elif "Swimming" in tracker.label:
        #print("day index: " + str(day_index))
        images.append(dict(
            source="https://i.imgur.com/qjf3Z2E.png",
            xref="x",
            yref="y",
            y=125,   # position in y units
            x=date_range[day_index],
            sizex=date_to_float(event_day),
            sizey=10,    # height in units of y
            xanchor="center",
            yanchor="middle",
            layer="above",
            opacity=1
        ))
    elif "Buzzing in ears" in tracker.label:
        images.append(dict(
            source="https://i.imgur.com/6m9pxo8.png",
            xref="x",
            yref="y",
            y=110,   # position in y units
            x=date_range[day_index],
            sizex=date_to_float(event_day),
            sizey=10,    # height in units of y
            xanchor="center",
            yanchor="middle",
            layer="above",
            opacity=1
        ))
    elif "Internal Heat" in tracker.label:
        images.append(dict(
            source="https://i.imgur.com/wpVA9QU.png",
            xref="x",
            yref="y",
            y=125,   # position in y units
            x=date_range[day_index],
            sizex=date_to_float(event_day),
            sizey=10,    # height in units of y
            xanchor="center",
            yanchor="middle",
            layer="above",
            opacity=1))
    elif "Night Event" in tracker.label or "Pre-Launch Vibrations" in tracker.label:
        images.append(dict(
            source="https://i.imgur.com/ibaiLvc.png",
            xref="x",
            yref="y",
            y=185,   # position in y units
            x=date_range[day_index],
            sizex=date_to_float(event_day),
            sizey=20,    # height in units of y
            xanchor="center",
            yanchor="middle",
            layer="above",
            opacity=1
        ))

        # Annotations: Check for notes around the days of Night events
        for note in notes:
            note_date = datetime.fromtimestamp(note.time / 1000).date()
            if note_date == event_day:
                annotations.append(dict(
                    x=note_date,
                    y=185,
                    xref='x',
                    yref='y',
                    text="[" + str(note_date) + "]<br>" + "<br>".join(wrap.wrap(note.value)),
                    align="left",
                    xshift=230,
                    yanchor="top"))

# Blood labs
images.append(dict(
            source="https://i.imgur.com/24fqXAv.png",
            xref="x",
            yref="y",
            y=200,   # position in y units
            x=date(2016, 8, 1),
            sizex=date_to_float(date(2016, 8, 1)),
            sizey=10,    # height in units of y
            xanchor="center",
            yanchor="middle",
            layer="above",
            opacity=1
        ))
# Adds a URL
annotations.append(dict(
    y=200,   # position in y units
    x=date(2016, 8, 1),
    text="""<a href="https://www.google.commmmmm" target="_new">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>""",
    xanchor="center",
    yanchor="middle",
    showarrow=False
    ))

# More annotations
annotations.append(dict(
                    x=start_chart_date,
                    y=185,
                    xref='x',
                    yref='y',
                    text="PRE-INTERVENTION PERIOD →",
                    font=dict(
                        family="sans-serif",
                        size=24,
                        color="#000000"
                        ),
                    xshift=230,
                    yanchor="top"))

annotations.append(dict(
                    x=regimen_start_date,
                    y=185,
                    xref='x',
                    yref='y',
                    text="← INTERVENTION START",
                    font=dict(
                        family="sans-serif",
                        size=24,
                        color="#008300"
                        ),
                    xshift=200,
                    yanchor="top"))

annotations.append(dict(
                    x=regimen_100_days,
                    y=185,
                    xref='x',
                    yref='y',
                    text="INTERVENTION END →",
                    font=dict(
                        family="sans-serif",
                        size=24,
                        color="#be0000"
                        ),
                    xshift=-150,
                    yanchor="top"))

# Regimen start
shapes.append(dict(
                type='line',
                layer='below',
                xref='x',
                yref='y',
                x0=regimen_start_date,
                y0=0,
                x1=regimen_start_date,
                y1=220,
                line=dict(
                    color="#008300",
                    width=5)
                ))


shapes.append(dict(
                type='line',
                layer='below',
                xref='x',
                yref='y',
                x0=regimen_100_days,
                y0=0,
                x1=regimen_100_days,
                y1=220,
                line=dict(
                    color="#be0000",
                    width=5)
                ))

# Shade entire intervention region
shapes.append(dict(
            type='rect',
            layer='below',
            xref='x',
            yref='y2',
            x0=regimen_start_date,
            y0=0,
            x1=regimen_100_days,
            y1=22,
            fillcolor="#fff000",
            opacity=0.15,
            line=dict(
                color="#fff000",
                width=0)
            ))

if debug and discarded > 0:
    print("Warning: Discarded " + str(discarded) + " events from " + str(len(missing_trackers.keys())) + " trackers.")
    print(missing_trackers)


# Create a plotly dataset for each tracker
for _id, tracker in trackers.items():
    yaxis = 'y2'
    interp = 'linear'
    connectgaps = False
    color = tracker.color
    size = 10
    thickness = 2
    # Ignore these trackers
    if "Pre-Launch Vibrations" in tracker.label or "Illness" in tracker.label or "Cold symptoms" in tracker.label or "Hangover" in tracker.label or "Internal Heat" in tracker.label or "Unhealthy Snack" in tracker.label or "High energy" in tracker.label or "Ate Fruit" in tracker.label or "Low energy" in tracker.label or "High energy" in tracker.label or "Lifted Weights" in tracker.label or "Running" in tracker.label or "Headache" in tracker.label or "Swimming" in tracker.label or "Buzzing in ears" in tracker.label or "Night Event" in tracker.label or "EEG" in tracker.label or "MRI" in tracker.label or "Blood Draw" in tracker.label or "Higher Thoughts" in tracker.label:
        continue
    if "Sensations on forehead" in tracker.label:
        interp = 'linear'
        connectgaps = False
    if "Sensations in solar plexus" in tracker.label:
        color = "#318300"
    if "Sensations in coccyx" in tracker.label:
        color = "#ff4633"
    if "Body vibrating" in tracker.label:
        color = "#ff00f6"
        size = 15
        thickness = 5
    if "Meditation" in tracker.label:
        size = 15
        thickness = 5
        all_data.append(go.Scattergl(
            x=date_range,
            y=tracker.day_totals,
            name=tracker.label,
            mode="lines",
            yaxis='y1',
            connectgaps=False,
            #fill="tozeroy",
            #fillcolor=tracker.color,
            line = dict(
                width=thickness,
                color=color,
                shape='linear'
                ),
            marker=dict(
                symbol='circle',
                size=size,
                opacity=1,
                color=tracker.color
                ),
            hoverinfo='y+name',
            hoverlabel=dict(namelength=-1)
            ))
    elif "Coffee" in tracker.label or "Tea" in tracker.label  or "Alcohol" in tracker.label or "Sex" in tracker.label:
        if "Alcohol" in tracker.label:
            color = "#ffa200"
        if "Sex" in tracker.label:
            color = "#ff3389"
        all_data.append(go.Bar(
            x=date_range,
            y=tracker.day_totals,
            name=tracker.label,
            yaxis=yaxis,
            opacity=0.35,
            marker = dict(
                color = color),
            hoverinfo='none'))
    else:
        all_data.append(go.Scattergl(
            x=date_range,
            y=tracker.day_totals,
            name=tracker.label,
            mode="lines",
            yaxis=yaxis,
            connectgaps=connectgaps,
            #fill="tozeroy",
            #fillcolor=tracker.color+"66",
            line = dict(
                color=color,
                width=thickness,
                shape=interp,
                #smoothing=1,
                ),
            marker=dict(
                symbol='circle',
                size=size,
                opacity=1,
                color=color
                ),
            hoverinfo='y+name',
            hoverlabel=dict(namelength=-1)
            ))


# Draw a vertical line every week, month, year, etc.
i = -1
for date in date_range:
    i += 1
    if date.day == 1:
        shapes.append(dict(
                type='line',
                layer='below',
                xref='x',
                yref='y',
                x0=date_range[i],
                y0=0,
                x1=date_range[i],
                y1=215,
                line=dict(
                    color="#8a8a8a",
                    width=2)
                ))
    elif date.day == 15:
        # Show month names
        annotations.append(dict(
                    x=date_range[i],
                    y=145,
                    xref='x',
                    yref='y',
                    text=date.strftime("%b"),
                    font=dict(
                        family="sans-serif",
                        size=50,
                        color="#000000"
                        ),
                    xshift=50,
                    opacity=0.25,
                    yanchor="top"))
    # Draw boxes around negative health events like illness, cold symptoms, and hangovers
    if date in illness_dates:
        shapes.append(dict(
            type='rect',
            layer='below',
            xref='x',
            yref='y2',
            x0=date_range[i-1],
            y0=0,
            x1=date_range[i+1],
            y1=22,
            fillcolor="#bdbdbd",
            opacity=0.15,
            line=dict(
                color="#bdbdbd",
                width=0)
            ))





# Layout determines style of chart
layout = go.Layout(
    title=dict(
        text='Super Meditate Me - Timeline',
        font=dict(
            family="sans-serif",
            size=30,
            color="#000000"),
        ),
    xaxis=dict(
        rangeslider=dict(
            visible = True,
            range = [earliest_event, latest_event]
        ),
        range=[slider_initial_start, slider_initial_start + timedelta(days=60)],
        type='date',
        #tickmode='linear',
        #tick0=0,
        #dtick=604800000.0, # ticks every week
        tickformat='%b %e %Y',
        ticks='inside',
        hoverformat='%b %e, %Y',
        ticktext=date_range
    ),
    paper_bgcolor='rgba(0,0,0,0)',
    plot_bgcolor='rgba(0,0,0,0)',
    yaxis=dict(
        title='Minutes'),
    yaxis2=dict(
        title='Units',
        side='right',
        overlaying='y'),
    #hovermode="x",
    barmode='stack',
    shapes=shapes,
    images=images,
    annotations=annotations
)

# Plot offline chart.
plotly.offline.plot({
    "data": all_data,
    "layout": layout
}, filename="./public/timeline.html", auto_open=False)
