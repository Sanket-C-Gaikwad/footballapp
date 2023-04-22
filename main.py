from flask import Flask, request, jsonify, render_template
from google.cloud import bigquery
from google.oauth2 import service_account

app = Flask(__name__)

# Set up BigQuery client
credentials = service_account.Credentials.from_service_account_file('bigqueryaccess.json')
client = bigquery.Client(credentials=credentials, project='adaptive-supply-chain')

# Define BigQuery ML model
model_name = 'Trained_Model2'
model_id = 'adaptive-supply-chain.football_games.' + model_name

# Define API endpoint for predictions
@app.route('/', methods=['GET', 'POST'])

def predict():
    if request.method == 'POST':
        # Get input data from request
        feature1 = request.form['feature1']
        feature2 = request.form['feature2']
        feature3 = request.form['feature3']
        #feature4 = request.form['feature4']
        #{feature4} AS Increase_in_fans 

        if feature1==feature2:
            prediction = 'n.a.'
        else:
            query = f"""
            SELECT predicted_label
            FROM ML.PREDICT(MODEL `{model_id}`, 
                        (SELECT 
                        '{feature1}' AS Team_1,
                        '{feature2}' AS Team_2,
                        '{feature3}' AS T1_Match_played
                        ))
                        """
            l_t = 0;
            query_job = client.query(query)
            print(query_job)

            for row in query_job:
                for c in row:
                    print(c)
                    l_t = c
            prediction = str(l_t)


        queryteam1 = f"""
        SELECT year_founded, num_goals, fan_club_members  
        FROM `adaptive-supply-chain.football_games.1_Football_Team_Data` 
        WHERE name='{feature1}'  
                        """
        
        qjobteam1 = client.query(queryteam1)
        resultt1 = qjobteam1.result()

        queryteam2 = f"""
        SELECT year_founded, num_goals, fan_club_members  
        FROM `adaptive-supply-chain.football_games.1_Football_Team_Data` 
        WHERE name='{feature2}'  
                        """
        qjobteam2 = client.query(queryteam2)
        resultt2 = qjobteam2.result()


        return render_template('index.html', prediction=prediction, team1=feature1, team2=feature2, rows2=resultt2, rows1=resultt1)
    else:
        return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)