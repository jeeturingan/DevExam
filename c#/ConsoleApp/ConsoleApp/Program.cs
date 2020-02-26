using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("How many numbers would you like to enter? ");
            int size = Convert.ToInt32(Console.ReadLine());
            int[] numArr = new int[size];
            string sortAlgo;

            for (int i = 0; i < size; i++)
            {
                Console.Write("Number[" + (i + 1) + "]: ");
                numArr[i] = Convert.ToInt32(Console.ReadLine());
            }

            Console.Write("\n[1] - Bubble Sort\n" +
                            "[2] - Selection Sort\n" +
                            "[3] - Insertion Sort\n" +
                            "[4] - Shell Sort\n" +
                            "[5] - Quick Sort\n" +
                            "Choose a Sorting Algorithm: ");
            sortAlgo = Console.ReadLine();


            Console.WriteLine("\nUnsorted: " + string.Join(", ", numArr));

            switch (sortAlgo)
            {
                case "1":
                    bubbleSort(numArr);
                    break;
                case "2":
                    selectionSort(numArr);
                    break;
                case "3":
                    insertionSort(numArr);
                    break;
                case "4":
                    shellSort(numArr);
                    break;
                case "5":
                    quickSort(numArr, 0, numArr.Length-1);
                    break;
                default:
                    Console.WriteLine("Default case");
                    break;
            }

            Console.WriteLine("Sorted: " + string.Join(", ", numArr));
            Console.ReadKey();
        }

        static int[] bubbleSort(int[] arr)
        {
            int temp = 0;

            for (int i=1; i < arr.Length; i++)
            {
                for (int j=0; j<arr.Length-1; j++)
                {
                    if (arr[j] > arr[j + 1]) 
                    {
                        temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }

            return arr;
        }

        static int[] selectionSort(int[] arr)
        {
            int temp = 0, iMin = 0;

            for (int j = 0; j < arr.Length - 1; j++)
            {
                iMin = j;
                for (int i = j + 1; i < arr.Length; i++)
                {
                    if (arr[i] < arr[iMin])
                        iMin = i;
                }
                if (iMin != j)
                {
                    temp = arr[j];
                    arr[j] = arr[iMin];
                    arr[iMin] = temp;
                }
            }

            return arr;
        }

        static int[] insertionSort(int[] arr)
        {
            int temp = 0;

            for (int i = 1; i <= arr.Length - 1; i++)
            {
                int j = i;
                while (j > 0 && arr[j - 1] > arr[j])
                {
                    temp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = temp;
                    j = j - 1;
                }
            }

            return arr;
        }

        static int[] shellSort(int[] arr)
        {
            for (int h = arr.Length/2; h>0; h/=2)
            {
                for (int i = h; i<arr.Length; i+=1)
                {
                    int temp = arr[i];
                    int j;
                    for (j = i; j >= h && arr[j-h] > temp; j -= h)
                    {
                        arr[j] = arr[j - h];
                    }

                    arr[j] = temp;
                }
            }
            
            return arr;
        }

        static int[] quickSort(int[] arr, int low, int high)
        {
            if (low > high)
            {
                int pivotIndex = partition(arr, low, high);
                quickSort(arr, low, pivotIndex);
                quickSort(arr, pivotIndex + 1, high);
            }

            return arr;
        }

        static int partition (int[] arr, int low, int high)
        {
            int pivot = arr[low], 
                lowIndex = low,
                temp;

            for (int i = low+1; i < high; i++)
            {
                if (arr[i] < pivot)
                {
                    temp = arr[i];
                    arr[i] = arr[lowIndex];
                    arr[lowIndex] = temp;
                    lowIndex++;
                }
            }

            temp = pivot;
            pivot = arr[lowIndex];
            arr[lowIndex] = temp;

            return lowIndex;
        }
    }
}
