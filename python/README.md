# Python Gesture Recognition Models

## Dataset

### ASL Alphabet Dataset

Dataset for the ASL Alphabet can be downloaded from [Kaggle](https://www.kaggle.com/datasets/grassknoted/asl-alphabet). Data has to be extracted and the **nothing** folder has to be renamed to **none**. (Otherwise it will not work with the Mediapipe Gesture Recognizer).

> Update: Another run was done with [Synthetic ASL Alphabet](https://www.kaggle.com/datasets/lexset/synthetic-asl-alphabet) dataset. Data has to be extracted and the **Blank** folder has to be renamed to **none**. (Otherwise it will not work with the Mediapipe Gesture Recognizer).

### ASL Numbers Dataset

Dataset for the ASL Numbers can be downloaded from [Kaggle](https://www.kaggle.com/datasets/lexset/synthetic-asl-numbers). Data has to be extracted and the **Blank** folder has to be renamed to **none**. (Otherwise it will not work with the Mediapipe Gesture Recognizer).

## Learning

### Mediapipe Gesture Recognizer Task

Since March 2023, Mediapipe has "deprecated" old solutions API and replaced it with new vision tasks API.

One particulary interesting "task" is the "Gesture recognition task".
This task can be fed a custom built blackbox model created using the **mediapipe-model-maker** toolkit.

#### Run on Colab

Unfortunately the mediapipe-model-maker tool only works on linux.
Therefore, a Jupyter notebook for the Google Colab is available in the **./colab** folder.

You will have to re-zip the asl_alphabet_train folder and upload it to the root folder of your Google Drive.

You can play with the Gamma and Learning Reate hyperparams, for reference see the [HParams Documentation](https://developers.google.com/mediapipe/api/solutions/python/mediapipe_model_maker/gesture_recognizer/HParams).

#### Run Locally

If you want to run the Jupyter notebook locally, you will have to do the following first:

```bash
python -m venv venv
source venv\bin\activate
python -m pip install --upgrade pip
pip install jupyterlab tensorflow==2.15.1 tf-models-official==2.15 mediapipe-model-maker
```

And remove the **!** comands and instead of loading from google drive, load from the local folder.

#### Exported Gesture Recongizer Task and testing.

Finished Gesture Recognizer tasks are located in the **./colab/tasks** folder.
They can be quickly tested without running the whole PingoLingo application using the [MediaPipe Studio](https://mediapipe-studio.webapps.google.com/studio/demo/gesture_recognizer).

#### Results

- ASL Alphabet - Gamma 2 (Default Settings)
  - Loss: 0.19900478422641754
  - Accuracy: 0.9350192546844482
- ASL Alphabet - Gamma 5
  - Loss: 0.131435165584087372
  - Accuracy: 0.9083905816078186
- ASL Alphabet - Gamma 2 - LR 0.0001
  - Loss: 0.2099192887544632
  - Accuracy: 0.9323396682739258
- ASL Alphabet - Gamma 5 - LR 0.0001 - LR Decay 0.5
  - Loss: 0.6410986185073853
  - Accuracy: 0.6166269779205322
- ASL Alphabet - Gamma 0
  - Loss: 0.362479567527771
  - Accuracy: 0.9109026789665222
- ASL Alphabet - Gamma 2 - LR Decay 0.5
  - Loss: 0.2477576732635498
  - Accuracy: 0.917769193649292
- ASL Alphabet - Gamma 2 - LR 0.01
  - Loss: 0.44732189178466797
  - Accuracy: 0.8576452732086182
- ASL Alphabet - Gamma 2 - Batch Size 4
  - Loss: 0.11151790618896484
  - Accuracy: 0.9542790055274963
- ASL Alphabet - Gamma 2 - Batch Size 8
  - Loss: 0.06986825913190842
  - Accuracy: 0.9701892733573914
- ASL Alphabet - Gamma 2 - Batch Size 16

  - Loss: 0.05217473581433296
  - Accuracy: 0.974041223526001

- ASL Number - Gamma 2 (Default Settings)
  - Test loss: 0.04715270549058914
  - Test accuracy:0.9831606149673462
- ASL Number - Gamma 5
  - Test loss: 0.011635559611022472
  - Test accuracy: 0.9857512712478638
- ASL Number - Gamma 5 - Learning Rate 0.0001
  - Test loss: 0.018045246601104736
  - Test accuracy: 0.9727979302406311
- ASL Number - Gamma 5 - Learing Rate 0.0001 - LR Decay 0.5
  - Loss: 0.018399996683001518
  - Accuracy: 0.9740932583808899
- ASL Number - Gamma 10 - LR 0.0001 - LR Decay 0.5
  - Loss: 0.009431392885744572
  - Accuracy: 0.9702072739601135
- ASL Number - Gamma 0 - LR 0.0001 - LR Decay 0.5
  - Loss: 0.15018218755722046
  - Accuracy: 0.9740932583808899
- ASL Number - Gamma 5, LR 0.00001, LR Decay 0.5, Batch Size 4
  - Loss: 0.016678204759955406
  - Accuracy: 0.9727979302406311