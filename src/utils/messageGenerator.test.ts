import { IState, valuesType } from "../types";
import messageGenerator from './messageGenerator';

describe('messageGenerator', () => {
    it('should return an empty string if template is empty', () => {
      const template: IState[] = [];
      const values: valuesType = {};
      const result = messageGenerator(template, values);
      expect(result).toBe('');
    });
  
    it('should replace placeholders with values in the template', () => {
      const template: IState[] = [
        {
            "id": "id-1694462168399-1",
            "value": "Hello, {firstname}",
            "ITE": [
                [
                    {
                        "id": "id-1694463189176-52",
                        "value": "{company}"
                    }
                ],
                [
                    {
                        "id": "id-1694463189176-53",
                        "value": "How are things going at {company}?"
                    }
                ],
                [
                    {
                        "id": "id-1694463189176-54",
                        "value": "I am a graphic designer. Let's connect!"
                    }
                ]
            ]
        },
        {
            "id": "id-1694463189176-55",
            "value": "Ana"
        }
    ];
      const values: valuesType = {firstname: 'Bill', lastname: '', company: 'EPAM', position: ''};
      const result = messageGenerator(template, values);
      expect(result).toBe('Hello, Bill\nHow are things going at EPAM?\nAna\n');
    });

    it('should work ITE in IF', () => {
        const template: IState[] = [
            {
                "id": "id-1694462168399-1",
                "value": "Hello, {firstname}",
                "ITE": [
                    [
                        {
                            "id": "id-1694463189176-52",
                            "value": "{company1}",
                            "ITE": [
                                [
                                    {
                                        "id": "id-1695669099475-0",
                                        "value": "{company2}"
                                    }
                                ],
                                [
                                    {
                                        "id": "id-1695669099475-1",
                                        "value": "true"
                                    }
                                ],
                                [
                                    {
                                        "id": "id-1695669099475-2",
                                        "value": ""
                                    }
                                ]
                            ]
                        },
                        {
                            "id": "id-1695669099475-3",
                            "value": ""
                        }
                    ],
                    [
                        {
                            "id": "id-1694463189176-53",
                            "value": "How are things going at {company1}{company2}?"
                        }
                    ],
                    [
                        {
                            "id": "id-1694463189176-54",
                            "value": "I am a graphic designer. Let's connect!"
                        }
                    ]
                ]
            },
            {
                "id": "id-1694463189176-55",
                "value": "Ana"
            }
        ];
        const values: valuesType = {firstname: 'Bill', lastname: '', company1: '', company2: "GM", position: ''};
        const result = messageGenerator(template, values);
        expect(result).toBe('Hello, Bill\nHow are things going at GM?\nAna\n');
      });
  
      it('should work like example in a video', () => {
        const template: IState[] = [
            {
                "id": "id-1694462168399-1",
                "value": "Hello {firstname}.",
                "ITE": [
                    [
                        {
                            "id": "id-1694463189176-52",
                            "value": "{company}"
                        }
                    ],
                    [
                        {
                            "id": "id-1694463189176-53",
                            "value": "",
                            "ITE": [
                                [
                                    {
                                        "id": "id-1695669945411-4",
                                        "value": "{mutualFirstFullName}"
                                    }
                                ],
                                [
                                    {
                                        "id": "id-1695669945411-5",
                                        "value": "How are things going at {company}? I'd love to connect with you. By the way, we seem to share a mutual contact - {mutualFirstFullName}."
                                    }
                                ],
                                [
                                    {
                                        "id": "id-1695669945411-6",
                                        "value": "How are things going at {company}? I'd love to connect with you."
                                    }
                                ]
                            ]
                        },
                        {
                            "id": "id-1695669945411-7",
                            "value": ""
                        }
                    ],
                    [
                        {
                            "id": "id-1694463189176-54",
                            "value": "",
                            "ITE": [
                                [
                                    {
                                        "id": "id-1695670038988-8",
                                        "value": "{mutualFirstFullName}"
                                    }
                                ],
                                [
                                    {
                                        "id": "id-1695670038988-9",
                                        "value": "We seem to both know {mutualFirstFullName}. I'd love to connect with you."
                                    }
                                ],
                                [
                                    {
                                        "id": "id-1695670038988-10",
                                        "value": "I am a graphic designer. Let's connect!"
                                    }
                                ]
                            ]
                        },
                        {
                            "id": "id-1695670038988-11",
                            "value": ""
                        }
                    ]
                ]
            },
            {
                "id": "id-1694463189176-55",
                "value": "Ana"
            }
        ];
        const values: valuesType = {firstname: 'Bill', lastname: '', company: '', position: '', mutualFirstFullName: 'Connor'};
        const result = messageGenerator(template, values);
        expect(result).toBe(`Hello Bill.\nWe seem to both know Connor. I'd love to connect with you.\nAna\n`);
      });
  });