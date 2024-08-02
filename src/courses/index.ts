import { TCourse } from './types'

export enum ECourseIds {
  ASL = '62d1f83b-3442-4a03-8187-3a28d26fd2fa',
}

// Full paths to be ready to potentially change to some cdn or something
export const COURSES: TCourse[] = [
  {
    id: ECourseIds.ASL,
    name: 'languages.asl',
    imagePath: '/images/course_images/ASL.gif',
    models: [
      {
        id: 'ASL_Letters_Synthetic',
        modelPath: '/tasks/asl_letters_synthetic.task',
        isSynthetic: true,
        isNumber: false,
      },
      {
        id: 'ASL_Letters_V1',
        modelPath: '/tasks/asl_letters_v1.task',
        isSynthetic: false,
        isNumber: false,
      },
      {
        id: 'ASL_Numbers_Synthetic',
        modelPath: '/tasks/asl_numbers_synthetic.task',
        isSynthetic: true,
        isNumber: true,
      },
      // FIXME: Should create a model trained on real data :)
      {
        id: 'ASL_Numbers_V1',
        modelPath: '/tasks/asl_numbers_v1.task',
        isSynthetic: false,
        isNumber: true,
      },
    ],
    symbols: [
      {
        id: 'ASL_0',
        name: '0',
        imagePath: '/images/symbols/numbers/0.png',
        handImagePaths: [
          '/images/course_hands/asl/0.png',
          '/images/course_hands/asl/0_1.png',
        ],
        isNumber: true,
      },
      {
        id: 'ASL_1',
        name: '1',
        imagePath: '/images/symbols/numbers/1.png',
        handImagePaths: [
          '/images/course_hands/asl/1.png',
          '/images/course_hands/asl/1_1.png',
        ],
        isNumber: true,
      },
      {
        id: 'ASL_2',
        name: '2',
        imagePath: '/images/symbols/numbers/2.png',
        handImagePaths: [
          '/images/course_hands/asl/2.png',
          '/images/course_hands/asl/2_1.png',
        ],
        isNumber: true,
      },
      {
        id: 'ASL_3',
        name: '3',
        imagePath: '/images/symbols/numbers/3.png',
        handImagePaths: [
          '/images/course_hands/asl/3.png',
          '/images/course_hands/asl/3_1.png',
        ],
        isNumber: true,
      },
      {
        id: 'ASL_4',
        name: '4',
        imagePath: '/images/symbols/numbers/4.png',
        handImagePaths: [
          '/images/course_hands/asl/4.png',
          '/images/course_hands/asl/4_1.png',
        ],
        isNumber: true,
      },
      {
        id: 'ASL_5',
        name: '5',
        imagePath: '/images/symbols/numbers/5.png',
        handImagePaths: [
          '/images/course_hands/asl/5.png',
          '/images/course_hands/asl/5_1.png',
        ],
        isNumber: true,
      },
      {
        id: 'ASL_6',
        name: '6',
        imagePath: '/images/symbols/numbers/6.png',
        handImagePaths: [
          '/images/course_hands/asl/6.png',
          '/images/course_hands/asl/6_1.png',
        ],
        isNumber: true,
      },
      {
        id: 'ASL_7',
        name: '7',
        imagePath: '/images/symbols/numbers/7.png',
        handImagePaths: [
          '/images/course_hands/asl/7.png',
          '/images/course_hands/asl/7_1.png',
        ],
        isNumber: true,
      },
      {
        id: 'ASL_8',
        name: '8',
        imagePath: '/images/symbols/numbers/8.png',
        handImagePaths: [
          '/images/course_hands/asl/8.png',
          '/images/course_hands/asl/8_1.png',
        ],
        isNumber: true,
      },
      {
        id: 'ASL_9',
        name: '9',
        imagePath: '/images/symbols/numbers/9.png',
        handImagePaths: [
          '/images/course_hands/asl/9.png',
          '/images/course_hands/asl/9_1.png',
        ],
        isNumber: true,
      },
      {
        id: 'ASL_10',
        name: '10',
        imagePath: '/images/symbols/numbers/10.png',
        handImagePaths: [
          '/images/course_hands/asl/10.png',
          '/images/course_hands/asl/10_1.png',
        ],
        isNumber: true,
      },
      {
        id: 'ASL_A',
        name: 'A',
        imagePath: '/images/symbols/letters/A.png',
        handImagePaths: [
          '/images/course_hands/asl/A.png',
          '/images/course_hands/asl/A_1.png',
          '/images/course_hands/asl/A_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_B',
        name: 'B',
        imagePath: '/images/symbols/letters/B.png',
        handImagePaths: [
          '/images/course_hands/asl/B.png',
          '/images/course_hands/asl/B_1.png',
          '/images/course_hands/asl/B_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_C',
        name: 'C',
        imagePath: '/images/symbols/letters/C.png',
        handImagePaths: [
          '/images/course_hands/asl/C.png',
          '/images/course_hands/asl/C_1.png',
          '/images/course_hands/asl/C_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_D',
        name: 'D',
        imagePath: '/images/symbols/letters/D.png',
        handImagePaths: [
          '/images/course_hands/asl/D.png',
          '/images/course_hands/asl/D_1.png',
          '/images/course_hands/asl/D_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_E',
        name: 'E',
        imagePath: '/images/symbols/letters/E.png',
        handImagePaths: [
          '/images/course_hands/asl/E.png',
          '/images/course_hands/asl/E_1.png',
          '/images/course_hands/asl/E_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_F',
        name: 'F',
        imagePath: '/images/symbols/letters/F.png',
        handImagePaths: [
          '/images/course_hands/asl/F.png',
          '/images/course_hands/asl/F_1.png',
          '/images/course_hands/asl/F_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_G',
        name: 'G',
        imagePath: '/images/symbols/letters/G.png',
        handImagePaths: [
          '/images/course_hands/asl/G.png',
          '/images/course_hands/asl/G_1.png',
          '/images/course_hands/asl/G_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_H',
        name: 'H',
        imagePath: '/images/symbols/letters/H.png',
        handImagePaths: [
          '/images/course_hands/asl/H.png',
          '/images/course_hands/asl/H_1.png',
          '/images/course_hands/asl/H_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_I',
        name: 'I',
        imagePath: '/images/symbols/letters/I.png',
        handImagePaths: [
          '/images/course_hands/asl/I.png',
          '/images/course_hands/asl/I_1.png',
          '/images/course_hands/asl/I_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_J',
        name: 'J',
        imagePath: '/images/symbols/letters/J.png',
        handImagePaths: [
          '/images/course_hands/asl/J.png',
          '/images/course_hands/asl/J_1.png',
          '/images/course_hands/asl/J_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_K',
        name: 'K',
        imagePath: '/images/symbols/letters/K.png',
        handImagePaths: [
          '/images/course_hands/asl/K.png',
          '/images/course_hands/asl/K_1.png',
          '/images/course_hands/asl/K_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_L',
        name: 'L',
        imagePath: '/images/symbols/letters/L.png',
        handImagePaths: [
          '/images/course_hands/asl/L.png',
          '/images/course_hands/asl/L_1.png',
          '/images/course_hands/asl/L_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_M',
        name: 'M',
        imagePath: '/images/symbols/letters/M.png',
        handImagePaths: [
          '/images/course_hands/asl/M.png',
          '/images/course_hands/asl/M_1.png',
          '/images/course_hands/asl/M_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_N',
        name: 'N',
        imagePath: '/images/symbols/letters/N.png',
        handImagePaths: [
          '/images/course_hands/asl/N.png',
          '/images/course_hands/asl/N_1.png',
          '/images/course_hands/asl/N_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_O',
        name: 'O',
        imagePath: '/images/symbols/letters/O.png',
        handImagePaths: [
          '/images/course_hands/asl/O.png',
          '/images/course_hands/asl/O_1.png',
          '/images/course_hands/asl/O_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_P',
        name: 'P',
        imagePath: '/images/symbols/letters/P.png',
        handImagePaths: [
          '/images/course_hands/asl/P.png',
          '/images/course_hands/asl/P_1.png',
          '/images/course_hands/asl/P_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_Q',
        name: 'Q',
        imagePath: '/images/symbols/letters/Q.png',
        handImagePaths: [
          '/images/course_hands/asl/Q.png',
          '/images/course_hands/asl/Q_1.png',
          '/images/course_hands/asl/Q_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_R',
        name: 'R',
        imagePath: '/images/symbols/letters/R.png',
        handImagePaths: [
          '/images/course_hands/asl/R.png',
          '/images/course_hands/asl/R_1.png',
          '/images/course_hands/asl/R_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_S',
        name: 'S',
        imagePath: '/images/symbols/letters/S.png',
        handImagePaths: [
          '/images/course_hands/asl/S.png',
          '/images/course_hands/asl/S_1.png',
          '/images/course_hands/asl/S_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_T',
        name: 'T',
        imagePath: '/images/symbols/letters/T.png',
        handImagePaths: [
          '/images/course_hands/asl/T.png',
          '/images/course_hands/asl/T_1.png',
          '/images/course_hands/asl/T_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_U',
        name: 'U',
        imagePath: '/images/symbols/letters/U.png',
        handImagePaths: [
          '/images/course_hands/asl/U.png',
          '/images/course_hands/asl/U_1.png',
          '/images/course_hands/asl/U_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_V',
        name: 'V',
        imagePath: '/images/symbols/letters/V.png',
        handImagePaths: [
          '/images/course_hands/asl/V.png',
          '/images/course_hands/asl/V_1.png',
          '/images/course_hands/asl/V_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_W',
        name: 'W',
        imagePath: '/images/symbols/letters/W.png',
        handImagePaths: [
          '/images/course_hands/asl/W.png',
          '/images/course_hands/asl/W_1.png',
          '/images/course_hands/asl/W_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_X',
        name: 'X',
        imagePath: '/images/symbols/letters/X.png',
        handImagePaths: [
          '/images/course_hands/asl/X.png',
          '/images/course_hands/asl/X_1.png',
          '/images/course_hands/asl/X_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_Y',
        name: 'Y',
        imagePath: '/images/symbols/letters/Y.png',
        handImagePaths: [
          '/images/course_hands/asl/Y.png',
          '/images/course_hands/asl/Y_1.png',
          '/images/course_hands/asl/Y_2.png',
        ],
        isNumber: false,
      },
      {
        id: 'ASL_Z',
        name: 'Z',
        imagePath: '/images/symbols/letters/Z.png',
        handImagePaths: [
          '/images/course_hands/asl/Z.png',
          '/images/course_hands/asl/Z_1.png',
          '/images/course_hands/asl/Z_2.png',
        ],
        isNumber: false,
      },
    ],
  },
]
